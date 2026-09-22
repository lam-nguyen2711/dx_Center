import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // Khởi tạo các phần tử trên trang web
  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator('#txtUserName');
    this.passwordInput = page.locator('#txtPassWord');
    this.loginButton = page.locator('#btnDangNhap');
  }

  // Hành động: Mở trang đăng nhập
  async goto() {
    await this.page.goto('https://dxcenter.vietinfo.tech/dangnhap?returnurl=%2fquan-ly-hop-%C4%91ong%2fhop-%C4%91ong');
  }

  // Hành động: Điền thông tin và bấm Đăng nhập
  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}