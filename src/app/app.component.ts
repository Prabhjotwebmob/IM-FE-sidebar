import { ViewContainerRef, AfterViewInit, ViewChild, Component, ComponentFactoryResolver } from '@angular/core';
import { loadRemoteModule } from './utils/federation-utils';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { loginSuccess } from '../../../IM-FE-libs/store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('chatComponent', { read: ViewContainerRef }) chatComponent;
  platformConstant = {
    INSTIMATCH: 'Instimatch',
    MUNIX: 'Munix'
  }
  liveRequestsCount = 0
  userAuthService = {
    platform: {
      host: 'Instimatch'
    },
    companyDetails: {
      showMMF: true
    },
    user: {
      isAdmin: 'Y',
      noticeAccountType: true,
      rightsOfMmCaptain: {
        isCaptain: true
      }
    }
  }
  showSubMenus = true
  Tooltip = {
    dontHavePermission: "You don't have permission to take this action.",
    dontHavePermissionToReadSettings: "You don't have permission to read these settings.",
    dontHavePermissionToReadMarket: "You don't have permission to read the market.",
  }
  chatService = {
    chatContactListFetched: false,
    chatService: [],
    normalUsers: [],
    adminUsers: [],
    searchedUserText: "",
    filterUsers: function (text) {
      return null
    }
  }
  product = {
    REPO: 'REPO',
    MONEY_MATCH: 'MONEY_MATCH',
    NOTICE_ACCOUNT: 'NOTICE_ACCOUNT',
    ADMIN_COCKPIT: 'ADMIN_COCKPIT',
    CHAT: 'CHAT',
    MONEY_MARKET_FUNDS: 'MONEY_MARKET_FUNDS',
    TRADING_PARTNER: 'TRADING_PARTNER',
    THOUGHT_EXCHANGE: 'THOUGHT_EXCHANGE',
    ECONOMIC_CALENDAR: 'ECONOMIC_CALENDAR',
  }
  token$: Observable<String>;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private store: Store<{ auth: String }>
  ) {
    this.token$ = store.pipe(select('auth'));
  }
  ngAfterViewInit(): void {
    loadRemoteModule({
      remoteEntry: "http://localhost:4003/remoteEntry.js",
      remoteName: "chat",
      exposedModule: "ChatComponent"
    })
      .then(module => {
        let factory = this.componentFactoryResolver.resolveComponentFactory(module.ChatComponent)
        this.chatComponent.createComponent(factory);
      });
  }
  hasAccessToProduct(product) {
    return true
    // return this.rolesAndPermissionsService.hasAccessToProduct(product);
  }
  hasAccessControl(product, permission) {
    return true
    // return this.rolesAndPermissionsService.hasAccessControl(product, permission);
  }
  activeIfContains(link) {
    return this.router.url.indexOf(link) !== -1;
  }

  activeIfContainsSetting(link) {
    return this.router.url === link;
  }
  openQuotes(openfor) {
    // if (!this.hasAccessControl('MONEY_MATCH', 'READ_TRADE')) return;
    // const payload = {
    //   action: openfor,
    //   fqxTab: this.fqxTab,
    //   allRequests: this.allRequestsWithoutFilter
    // }
    // this.dialogService.liveAndPreviousQuotes(payload);
  }
  uploadQuotes() {

  }
  getHeaderLogo() {
    // if(this.userAuthService.user.skinversion === skinVersion.SKIN2){
    //   return 'assets/img/logo/instimatch-black.svg';
    // }
    return 'assets/img/logo/instimatch-white.svg';
  }
  getHeaderMainText() {
    if (this.activeIfContains('/web/money-market/')) {
      return 'MoneyMatch';
    } else if (this.activeIfContains('/web/repo/')) {
      return 'RepoBlick';
    } else if (this.activeIfContains('/web/notice-account')) {
      return 'NoticeAccount';
    } else if (this.activeIfContains('/web/mosaic')) {
      return 'MoneyMarketFunds';
    } else if (this.activeIfContains('/web/thought-exchange')) {
      return 'ThoughtExchange';
    }
  }
  goToRepoMarket(repoMarketCurrencyTab?) {
    const isCollapsed = repoMarketCurrencyTab?.className?.includes('collapsed');
    this.navigateToRoute('/web/repo/market', true);
    isCollapsed && repoMarketCurrencyTab?.click();
  }
  navigateToRoute(routeToNavigate, checkError = false) {
    // this.ngxSpinnerService.show();
    this.router.navigate([routeToNavigate]).then(() => {
      // this.ngxSpinnerService.hide();
    }).catch(async (err) => {
      console.error("Navigation Error", err);
      const chunkFailedMessage = /Loading chunk/;
      const errorText = err?.error?.message || err?.message || '';
      if (checkError && (chunkFailedMessage.test(errorText) || chunkFailedMessage.test(errorText))) {
        await Promise.all((await caches.keys()).map(caches.delete));
        this.navigateToRoute(routeToNavigate);
      } else {
        // this.ngxSpinnerService.hide();
        // this.toastrService.error(toasterMessage.buildErrorPageReload, 'Error');
      }
    });
  }
  goToMoneyMarketTab(moneyMarketCurrencyTab?) {
    // const isCollapsed = moneyMarketCurrencyTab?.className?.includes('collapsed');
    // if(this.userAuthService.platform.host == this.platformConstant.MUNIX) {
    //   this.navigateToRoute('/web/money-market/GBP', true);
    // } else {
    //   this.continousApiService.sortCurrenciesOnLoad(this.userAuthService.user.currencySortOrder);
    //   let enabledCurrencies = this.userAuthService.user.enabledCurrency && this.continousApiService.sortEnabledCurrencies(this.userAuthService.user.enabledCurrency).split(',') || [];
    //   let activeCurrency = enabledCurrencies.length > 0 && enabledCurrencies[0] || '';
    //   activeCurrency && this.navigateToRoute('/web/money-market/' + activeCurrency, true);
    // }
    // isCollapsed && moneyMarketCurrencyTab?.click();
    this.navigateToRoute('/web/money-market/GBP', true);
  }

  goToNoticeAccountTab(noticeAccountTab?) {
    const isCollapsed = noticeAccountTab?.className?.includes('collapsed');
    // let enabledCurrencies = this.userAuthService.user?.noticeAccount?.enabledCurrencies && this.continousApiService.sortEnabledCurrencies(this.userAuthService.user?.noticeAccount?.enabledCurrencies).split(',') || [];
    // let activeCurrency = '';
    // let activeCurrency = enabledCurrencies.length > 0 && enabledCurrencies[0] || '';
    // activeCurrency && this.navigateToRoute('/web/notice-account/' + activeCurrency, true);
    this.navigateToRoute('/web/notice-account/CHF', true);
    isCollapsed && noticeAccountTab?.click();
  }
  navigateToMosaic(moneyMarketFundsTab?) {
    const isCollapsed = moneyMarketFundsTab?.className?.includes('collapsed');
    this.navigateToRoute('/web/mosaic/mosaic-liquidity');
    isCollapsed && moneyMarketFundsTab?.click();
  }
  changeToken() {
    this.store.dispatch(loginSuccess({ token: "myToken" + new Date().getTime(), redirect: true }));
  }
}
