if (!customElements.get('product-model')) {
  customElements.define('product-model', class ProductModel extends DeferredMedia {
    constructor() {
      super();
    }

    loadContent() {
      super.loadContent();

      shopi.loadFeatures([
        {
          name: 'model-viewer-ui',
          version: '1.0',
          onLoad: this.setupModelViewerUI.bind(this),
        },
      ]);
    }

    setupModelViewerUI(errors) {
      if (errors) return;

      this.modelViewerUI = new shopi.ModelViewerUI(this.querySelector('model-viewer'));
    }
  });
}

window.ProductModel = {
  loadshopiXR() {
    shopi.loadFeatures([
      {
        name: 'shopi-xr',
        version: '1.0',
        onLoad: this.setupshopiXR.bind(this),
      },
    ]);
  },

  setupshopiXR(errors) {
    if (errors) return;

    if (!window.shopiXR) {
      document.addEventListener('shopi_xr_initialized', () =>
        this.setupshopiXR()
      );
      return;
    }

    document.querySelectorAll('[id^="ProductJSON-"]').forEach((modelJSON) => {
      window.shopiXR.addModels(JSON.parse(modelJSON.textContent));
      modelJSON.remove();
    });
    window.shopiXR.setupXRElements();
  },
};

window.addEventListener('DOMContentLoaded', () => {
  if (window.ProductModel) window.ProductModel.loadshopiXR();
});
