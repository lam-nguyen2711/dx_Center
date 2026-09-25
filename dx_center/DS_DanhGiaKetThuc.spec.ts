import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPages';
import { DashboardPage } from '../pages/DashboardPage_QuanLyDuAn';
import { DS_DanhGiaKetThuc } from '../pages/ListDanhGiaKetThuc';
test('Kiểm thử tự động - Danh sách đánh giá kết thúc', async ({ page }) => {
    // ---- PHẦN 1: ĐĂNG NHẬP ----  
      // Khởi tạo đối tượng LoginPage
      const loginPage = new LoginPage(page);
      // 1. Mở trang đăng nhập
      await loginPage.goto();
      // 2. Gọi hàm đăng nhập và truyền tài khoản/mật khẩu vào
      await loginPage.login('trinh.vo', 'abcd@1234');
      // 3. Kiểm tra URL thay đổi sau khi đăng nhập thành công
      await expect(page).toHaveURL(/.*giao-viec\/thong-ke-giao-viec-ca-nhan.*/);

    // Vào Quản lý dự án
    const dashboardPage = new DashboardPage(page);
     await dashboardPage.clickQuanLyDuAn();

     // ---- PHẦN 2: DANH SÁCH ĐÁNH GIÁ KẾT THÚC ----  
    const ds_Danh_gia_ket_thuc = new DS_DanhGiaKetThuc(page);
    await ds_Danh_gia_ket_thuc.clickDSDanhGiaKetThuc();
    
});
    
