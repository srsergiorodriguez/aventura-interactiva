<script>
  import { aventuraState } from '../state.svelte.js';
  import { i18n } from '../lib/i18n.svelte.js';
  import Aventura from '../lib/aventura.esm.js';

  let { isOpen = false, onClose } = $props();

  let grammarString = $state('');
  let testReport = $state(null);

  $effect(() => {
    if (isOpen) {
      if (aventuraState.options.grammar && Object.keys(aventuraState.options.grammar).length > 0) {
        grammarString = JSON.stringify(aventuraState.options.grammar, null, 2);
      } else {
        grammarString = "{\n  \"base\": [\n    \"aventura\"\n  ]\n}";
      }
      testReport = null;
    }
  });

  function parseLooseJSON(input) {
    try {
      return JSON.parse(input);
    } catch (e) {
      // Fallback: evaluate as a native JS object
      return (new Function('return ' + input))();
    }
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = parseLooseJSON(event.target.result);
        grammarString = JSON.stringify(parsed, null, 2);
        testReport = null;
      } catch (err) {
        alert(i18n.t('invalid_json'));
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  }

  function handleTest() {
    testReport = { errors: [], warnings: [], passed: false };
    let parsedGrammar;
    
    try {
      parsedGrammar = parseLooseJSON(grammarString);
    } catch (err) {
      testReport.errors.push({ code: 'PARSE_ERROR', details: err.message });
      return;
    }

    const tempEngine = new Aventura(i18n.lang, {});
    tempEngine.setGrammar(parsedGrammar).testGrammar();
    testReport = tempEngine.grammarReport;
  }

  function handleSave() {
    try {
      const parsedGrammar = parseLooseJSON(grammarString);
      aventuraState.options.grammar = parsedGrammar;
      onClose();
    } catch (err) {
      alert(i18n.t('invalid_json'));
    }
  }
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div class="modal-content">
      <header class="modal-header">
        <h3 style="margin: 0;">{i18n.t('grammar_editor')}</h3>
        <button class="btn-close" onclick={onClose}>x</button>
      </header>
      
      <div class="modal-body">
        
        <div class="action-bar">
          <label class="btn btn-secondary file-upload-btn" style="border-style: dashed; padding: 0.4rem 1rem; cursor: pointer;">
            {i18n.t('load_json')}
            <input type="file" accept=".json" onchange={handleFileUpload} hidden />
          </label>
          <button class="btn btn-primary" onclick={handleTest}>{i18n.t('test_grammar')}</button>
        </div>

        <textarea 
          class="grammar-textarea" 
          bind:value={grammarString} 
          spellcheck="false"
        ></textarea>

        {#if testReport}
          <div class="console-output {testReport.passed ? 'passed' : 'failed'}">
            {#if testReport.passed}
              <p class="success-msg">✓ {i18n.t('test_passed')}</p>
            {:else}
              
              {#each testReport.errors as err}
                {#if err.code === 'PARSE_ERROR'}
                  <p class="error-msg">✖ {i18n.t('err_parse')} {err.details}</p>
                {:else if err.code === 'INVALID_ROOT'}
                  <p class="error-msg">✖ {i18n.t('err_invalid_root')}</p>
                {:else if err.code === 'INVALID_RULE_TYPE'}
                  <p class="error-msg">✖ {i18n.t('err_invalid_rule')} "{err.rule}"</p>
                {:else if err.code === 'NO_GRAMMAR'}
                  <p class="error-msg">✖ {i18n.t('err_no_grammar')}</p>
                {:else if err.code === 'SYNTAX_ERROR'}
                  <p class="error-msg">✖ {i18n.t('err_syntax')} "{err.rule}": {err.details}</p>
                {:else if err.code === 'MISSING_REF'}
                  <p class="error-msg">✖ {i18n.t('err_missing_ref')} "{err.rule}": {err.missing.join(", ")}</p>
                {/if}
              {/each}

              {#each testReport.warnings as warn}
                {#if warn.code === 'EMPTY_RULE'}
                  <p class="warn-msg">⚠ {i18n.t('warn_empty_rule')} "{warn.rule}"</p>
                {:else if warn.code === 'CIRCULAR_DEP'}
                  <p class="warn-msg">⚠ {i18n.t('warn_circular')} {warn.cycle}</p>
                {/if}
              {/each}

            {/if}
          </div>
        {/if}

      </div>

      <footer class="modal-footer">
        <button class="btn btn-primary w-full" onclick={handleSave}>{i18n.t('save_grammar')}</button>
      </footer>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop { 
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
    background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; 
  }
  
  .modal-content { 
    background: var(--bg-color); border: var(--border-main); width: 90vw; height: 90vh; max-width: 800px;
    box-shadow: 8px 8px 0px rgba(0,0,0,1); display: flex; flex-direction: column; 
  }
  
  .modal-header, .modal-footer { 
    padding: 1rem; background: var(--text-color); color: var(--bg-color); 
    display: flex; justify-content: space-between; align-items: center; 
  }
  
  .modal-body { 
    padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; flex-grow: 1; overflow: hidden;
  }

  .action-bar {
    display: flex; justify-content: space-between;
  }

  .grammar-textarea {
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
    font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', monospace;
    font-size: 0.9rem;
    padding: 1rem;
    border: var(--border-main);
    background: #fafafa;
    resize: none;
    white-space: pre;
  }

  /* Console output styling */
  .console-output {
    padding: 1rem;
    border: var(--border-main);
    max-height: 150px;
    overflow-y: auto;
    font-family: monospace;
    font-size: 0.85rem;
  }
  
  .console-output.failed { background: #ffebee; border-color: red; }
  .console-output.passed { background: #e8f5e9; border-color: green; }

  .error-msg { color: red; margin: 0 0 0.5rem 0; }
  .warn-msg { color: orange; margin: 0 0 0.5rem 0; }
  .success-msg { color: green; margin: 0; font-weight: bold; }
</style>