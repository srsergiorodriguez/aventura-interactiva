<script>
  import { app, updateGrammar } from '../state.svelte.js';
  import { i18n } from '../lib/i18n.svelte.js';
  import { notify } from '../ui/toast.svelte.js';
  import { Aventura } from '../lib/engine.js';
  import Modal from '../ui/Modal.svelte';

  let { isOpen = false, onClose } = $props();

  let grammarString = $state('');
  let testReport = $state(null);

  $effect(() => {
    if (isOpen) {
      if (app.project.grammar && Object.keys(app.project.grammar).length > 0) {
        grammarString = JSON.stringify(app.project.grammar, null, 2);
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
        notify(i18n.t('invalid_json'), 'error');
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
      updateGrammar(parsedGrammar);
      onClose();
    } catch (err) {
      notify(i18n.t('invalid_json'), 'error');
    }
  }
</script>

<Modal
  {isOpen}
  title={i18n.t('grammar_editor')}
  size="wide"
  bodyFlush
  onClose={onClose}
>
  {#snippet children()}
    <div class="grammar-body">
        <div class="action-bar">
          <label class="btn btn-secondary file-upload-btn grammar-file">
            {i18n.t('load_json')}
            <input type="file" accept=".json" onchange={handleFileUpload} hidden />
          </label>
          <button class="btn btn-primary" onclick={handleTest}>{i18n.t('test_grammar')}</button>
        </div>

        <textarea 
          class="grammar-textarea" 
          aria-label={i18n.t('grammar_editor')}
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
  {/snippet}

  {#snippet footer()}
    <button class="btn btn-primary w-full" onclick={handleSave}>{i18n.t('save_grammar')}</button>
  {/snippet}
</Modal>

<style>

  .grammar-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .action-bar {
    display: flex; justify-content: space-between;
  }

  .grammar-file {
    border-style: dashed;
    padding: 0.4rem 1rem;
    cursor: pointer;
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