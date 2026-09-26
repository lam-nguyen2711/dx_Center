import { Page, Locator } from '@playwright/test';

export class LoaiDuAn{
  readonly page: Page;
  readonly menuDanhMuc: Locator;
  readonly loaiDuAn: Locator;
  readonly inputTimKiem: Locator;

  constructor(page: Page) {
    this.page = page;
    // 1. Menu cha: Danh mục
    this.menuDanhMuc = page.locator('span[title="Danh mục"]');
    // 2. Menu con: Loại dự án
    this.loaiDuAn = page.locator('a[href*="danh-muc/loai-du-an"]');
    // Tìm kiếm loại dự án
    this.inputTimKiem = page.getByPlaceholder('Tìm kiếm...');
  }

  // Hành động: Click vào menu Quản lý dự án (loại dự án)
  async clickLoaiDuAn() {
    // Bước 1: Ép click trực tiếp vào menu cha "Danh mục" bằng JavaScript nội bộ
    await this.menuDanhMuc.evaluate((el) => (el as HTMLElement).click());
    // Chờ một chút để hiệu ứng mở menu hoàn tất
    await this.page.waitForTimeout(500); 
    // Bước 2: Ép click trực tiếp vào menu con "Loại dự án" bằng JavaScript nội bộ
    await this.loaiDuAn.evaluate((el) => (el as HTMLElement).click());
  }
  
  // Hàm tìm loại dự án}
  async nhapTuKhoaTimKiem(tuKhoa: string) {
    // 1. Click vào ô tìm kiếm
    await this.inputTimKiem.click();
    // 2. Xóa chữ cũ
    await this.inputTimKiem.press('Control+A');
    await this.inputTimKiem.press('Backspace');
    // 3. Gõ từng ký tự để kích hoạt sự kiện tìm kiếm của web
    await this.inputTimKiem.pressSequentially(tuKhoa, { delay: 100 });
    // 4. Nhấn Enter và đợi bảng cập nhật dữ liệu
    await this.inputTimKiem.press('Enter');
    await this.page.waitForTimeout(1500);
  }
}