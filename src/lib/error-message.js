// @ts-check

import { i18n } from './i18n.svelte.js';

/**
 * Map a stable domain/persistence error code to a localized UI message.
 *
 * @param {unknown} error
 * @returns {string}
 */
export function messageForError(error) {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String(/** @type {{ code?: unknown }} */ (error).code)
      : '';

  switch (code) {
    case 'EMPTY_NAME':
      return i18n.t('must_name_scene');
    case 'STARTS_WITH_NUMBER':
      return i18n.t('no_number_scene_name');
    case 'DUPLICATE_SCENE':
      return i18n.t('scene_name_duplicate');
    case 'INVALID_NAME':
      return i18n.t('scene_name_invalid');
    case 'INVALID_IMAGE':
      return i18n.t('image_process_error');
    case 'TARGET_NOT_FOUND':
    case 'SCENE_NOT_FOUND':
      return i18n.t('scene_missing');
    case 'NO_SCENES':
      return i18n.t('no_scenes');
    case 'MISSING_START':
    case 'EXPORT_BLOCKED':
      return i18n.t('export_blocked');
    case 'MISSING_ENGINE_SOURCE':
    case 'MISSING_MINIGIF_SOURCE':
      return i18n.t('export_error');
    case 'SAVE_FAILED':
    case 'QUOTA_EXCEEDED':
      return i18n.t('save_error');
    case 'UNAVAILABLE':
      return i18n.t('autosave_unavailable');
    case 'INVALID_JSON':
    case 'INVALID_PROJECT':
    case 'INVALID_STORY':
    case 'INVALID_SCENE':
    case 'INVALID_SCENES':
    case 'INVALID_OPTIONS':
    case 'INVALID_AREAS':
    case 'INVALID_OPTION':
    case 'INVALID_AREA':
    case 'INVALID_AREA_COORDINATES':
    case 'INVALID_GRAMMAR':
    case 'INVALID_IGRAMA':
    case 'UNSUPPORTED_VERSION':
    case 'INVALID_LANG':
    case 'DUPLICATE_OPTION_ID':
    case 'DUPLICATE_AREA_ID':
      return i18n.t('project_open_error');
    case 'OPTION_NOT_FOUND':
    case 'AREA_NOT_FOUND':
      return i18n.t('scene_missing');
    default:
      return i18n.t('unknown_error');
  }
}
