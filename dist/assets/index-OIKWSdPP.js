import{G as A,J as v,O as C,K as E,N as T,g as I,o as y,h as _,A as l,x as b,n as x,M as S,E as d,P as g,W as p,S as m,Q as N,l as O}from"./index-CrAQh-3d.js";import{Y as k,V as z}from"./index-CrAQh-3d.js";const s=A({status:"uninitialized"}),u={state:s,subscribeKey(e,t){return T(s,e,t)},subscribe(e){return E(s,()=>e(s))},_getClient(){if(!s._client)throw new Error("SIWEController client not set");return s._client},async getNonce(e){const n=await this._getClient().getNonce(e);return this.setNonce(n),n},async getSession(){try{const t=await this._getClient().getSession();return t&&(this.setSession(t),this.setStatus("success")),t}catch{return}},createMessage(e){const n=this._getClient().createMessage(e);return this.setMessage(n),n},async verifyMessage(e){return await this._getClient().verifyMessage(e)},async signIn(){return await this._getClient().signIn()},async signOut(){const e=this._getClient();await e.signOut(),this.setStatus("ready"),this.setSession(void 0),e.onSignOut?.()},onSignIn(e){this._getClient().onSignIn?.(e)},onSignOut(){this._getClient().onSignOut?.()},setSIWEClient(e){s._client=v(e),s.status="ready",C.setIsSiweEnabled(e.options.enabled)},setNonce(e){s.nonce=e},setStatus(e){s.status=e},setMessage(e){s.message=e},setSession(e){s.session=e,s.status=e?"success":"ready"}},R=I`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;var U=function(e,t,n,a){var r=arguments.length,i=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,n):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,a);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i};let f=class extends _{constructor(){super(...arguments),this.dappImageUrl=C.state.metadata?.icons,this.walletImageUrl=l.state.connectedWalletInfo?.icon}firstUpdated(){const t=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");t?.[0]&&this.createAnimation(t[0],"translate(18px)"),t?.[1]&&this.createAnimation(t[1],"translate(-18px)")}render(){return b`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(t,n){t.animate([{transform:"translateX(0px)"},{transform:n}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};f.styles=R;f=U([y("w3m-connecting-siwe")],f);var h=function(e,t,n,a){var r=arguments.length,i=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,n):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,a);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i};let w=class extends _{constructor(){super(...arguments),this.dappName=C.state.metadata?.name,this.isSigning=!1,this.isCancelling=!1}render(){return this.onRender(),b`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}onRender(){u.state.session&&S.close()}async onSign(){this.isSigning=!0,d.sendEvent({event:"CLICK_SIGN_SIWE_MESSAGE",type:"track",properties:{network:g.state.caipNetwork?.id||"",isSmartAccount:l.state.preferredAccountType===p.ACCOUNT_TYPES.SMART_ACCOUNT}});try{u.setStatus("loading");const t=await u.signIn();return u.setStatus("success"),d.sendEvent({event:"SIWE_AUTH_SUCCESS",type:"track",properties:{network:g.state.caipNetwork?.id||"",isSmartAccount:l.state.preferredAccountType===p.ACCOUNT_TYPES.SMART_ACCOUNT}}),t}catch{const a=l.state.preferredAccountType===p.ACCOUNT_TYPES.SMART_ACCOUNT;return a?m.showError("This application might not support Smart Accounts"):m.showError("Signature declined"),u.setStatus("error"),d.sendEvent({event:"SIWE_AUTH_ERROR",type:"track",properties:{network:g.state.caipNetwork?.id||"",isSmartAccount:a}})}finally{this.isSigning=!1}}async onCancel(){this.isCancelling=!0,l.state.isConnected?(await N.disconnect(),S.close()):O.push("Connect"),this.isCancelling=!1,d.sendEvent({event:"CLICK_CANCEL_SIWE",type:"track",properties:{network:g.state.caipNetwork?.id||"",isSmartAccount:l.state.preferredAccountType===p.ACCOUNT_TYPES.SMART_ACCOUNT}})}};h([x()],w.prototype,"isSigning",void 0);h([x()],w.prototype,"isCancelling",void 0);w=h([y("w3m-connecting-siwe-view")],w);export{u as SIWEController,f as W3mConnectingSiwe,w as W3mConnectingSiweView,k as getDidAddress,z as getDidChainId};
