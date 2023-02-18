/** 
* 
*/
export const schemas = {
  SimpleMessage: {
    type: 'object',
    properties: {
      msg: {
        type: 'string'
      }
    }
  },
  Asset: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      size: { type: 'number' },
      mime: { type: 'string' },
      createAt: { type: 'string' },
      lastUpdateAt: { type: 'string' }
    }
  },
  UploadAsset: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      size: { type: 'number' },
      mime: { type: 'string' },
      createAt: { type: 'string' },
      lastUpdateAt: { type: 'string' },
      original: { type: 'string' }
    }
  },
  UploadFailed: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      reason: { type: 'string' }
    }
  },
  UploadSuccess: {
    type: 'object',
    properties: {
      msg: { type: 'string' },
      multi: { type: 'boolean' },
      success: {
        type: 'array',
        items: {
          '$ref': '#/components/schemas/UploadAsset'
        }
      },
      failed: {
        type: 'array',
        items: {
          '$ref': '#/components/schemas/UploadFailed'
        }
      }
    }
  },
  UpdateSuccess: {
    type: 'object',
    properties: {
      msg: { type: 'string' },
      update: {
        '$ref': '#/components/schemas/UploadAsset'
      }
    }
  },
  DeleteResult: {
    type: 'object',
    properties: {
      msg: { type: 'string' },
      success: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      failed: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  },
  ReadList: {
    type: 'object',
    properties: {
      msg: { type: 'string' },
      files: {
        type: 'array',
        items: {
          '$ref': '#/components/schemas/Asset'
        }
      }
    }
  }
}