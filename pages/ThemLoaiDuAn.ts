import { Page, Locator } from '@playwright/test';

export class LoaiDuAnPage {
  readonly page: Page;
  readonly btnThemMoi: Locator;
  readonly inputTen: Locator;
  readonly inputMa: Locator;
  readonly inputMoTa: Locator;
  readonly btnLuu: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Nút Thêm mới nằm ngoài màn hình chính (trước khi mở popup)
    this.btnThemMoi = page.getByRole('button', { name: 'Thêm mới' });
    
    // Các trường nhập liệu trong popup (Dùng regex /Tên/ để bỏ qua dấu * bắt buộc)
    this.inputTen = page.getByRole('textbox', { name: /Tên/ });
    this.inputMa = page.getByRole('textbox', { name: 'Mã', exact: true });
    this.inputMoTa = page.getByRole('textbox', { name: 'Mô tả' });
    // Nút Lưu trên popup
    this.btnLuu = page.getByRole('button', { name: 'Lưu' });
  }
  
  // Điều hướng trực tiếp đến trang danh mục loại dự án
  async goto() {
    await this.page.goto('https://dxcenter.vietinfo.tech/quan-ly-du-an/danh-muc/loai-du-an');
  }

  // Gộp các bước nhập liệu vào 1 hành động
  async themLoaiDuAn(ten: string, ma: string, moTa: string) {
    await this.btnThemMoi.click();
    await this.inputTen.fill(ten);
    await this.inputMa.fill(ma);
    await this.inputMoTa.fill(moTa);
    await this.btnLuu.click();
  }
}