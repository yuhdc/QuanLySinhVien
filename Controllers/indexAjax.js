
//------------- GET: LẤY DỮ LIỆU TỪ SERVER BACKEND CUNG CẤP -------
var svService = new QuanLySinhVienService();

var loadDuLieuSinhVien = function () {

    // var objectAjax = {
    //     url:'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //Đường dẫn đến backend lấy dữ liệu (backend qui định)
    //     method: 'GET'// Phương thức do backend qui định
    // }
    var a = 0;
    //Dùng thư viện axios gọi về backend cung cấp thông tin cho backend
    var promise = svService.layThongTinSinhVien();

    //Trường hợp request thành công
    promise.then(function (result) {
        a = 1;
        //Function sẽ tự động thực thi ngay khi có dữ liệu (request thành công) 
        console.log(result.data)
        //Sau khi lấy dữ liệu từ backend => Tạo table in ra giao diện
        renderTableSinhVien(result.data);
    })

    //Trường hợp thất bại 
    promise.catch(function (err) {
        a = 1;
        //Hàm này sẽ được kích hoạt khi request thất bại trả về lỗi
        console.log(err.response.data);
    })

    setTimeout(function () {
        console.log(a);

    }, 2000)

}


//Viết hàm renderTable để hiển thị dữ liệu ra giao diện 
var renderTableSinhVien = function (arrSinhVien) {
    var noiDungTable = '';
    for (var i = 0; i < arrSinhVien.length; i++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên từ trong mangSinhVien
        var sv = new SinhVien();
        sv.maSinhVien = arrSinhVien[i].maSinhVien;
        sv.tenSinhVien = arrSinhVien[i].tenSinhVien;
        sv.email = arrSinhVien[i].email;
        sv.soDienThoai = arrSinhVien[i].soDienThoai;
        sv.diemHoa = arrSinhVien[i].diemHoa;
        sv.diemLy = arrSinhVien[i].diemLy;
        sv.diemToan = arrSinhVien[i].diemToan;
        sv.diemRenLuyen = arrSinhVien[i].diemRenLuyen;
        sv.loaiSinhVien = arrSinhVien[i].loaiSinhVien;
        noiDungTable += `
                <tr>
                    <td>${sv.maSinhVien}</td>
                    <td>${sv.tenSinhVien}</td>
                    <td>${sv.email}</td>
                    <td>${sv.soDienThoai}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>${sv.xepLoai()}</td>
                    <td>
                        <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button>      
                        <button class="btn btn-primary" onclick="chinhSua('${sv.maSinhVien}')"> chỉnh sửa </button>             
                    </td>
                </tr> 
        `
    }
    //dom đến thẻ tbody gán innerHTML của tbody = noiDungTable
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}


//Gọi hàm load ngay khi giao diện vừa load lên
loadDuLieuSinhVien();

//-------------------- POST: THÊM MỚI DỮ LIỆU VÀO SERVER THÔNG QUA BACKEND ------------

document.querySelector('#btnXacNhan').onclick = function () {

    //Lấy thông tin người dùng nhập từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;

    console.log('sinh viên', sv);
    //Bỏ qua bước kiểm tra dữ liệu đầu vào (validation);

    //Dùng thư viện axios đưa dữ liệu về server
  
    var promise = svService.themSinhVien(sv);

    //Xử lý khi request thành công
    promise.then(function (result) {
        console.log("Kết quả", result.data);
        //Gọi lại api load table sau khi thêm thành công
        loadDuLieuSinhVien();
    })
    //Xử lý khi request thất bại
    promise.catch(function (error) {
        console.log(error.response.data)
    })

}


//-------------------DELETE : Xóa dữ liệu server dựa vào api --------------


var xoaSinhVien = function (maSinhVien) {
    // alert(maSinhVien);
    //Gọi api request đến backend
    // var promise = axios({
    //     url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVien,
    //     method: 'DELETE'
    // });
    var promise = svService.xoaSinhVien(maSinhVien);
    //Xử lý khi xóa thông tin thành công
    promise.then(function (result) {
        console.log(result.data);
        //Gọi hàm api lấy thông tin sinh viên 1 lần nữa từ server sau khi xóa
        loadDuLieuSinhVien();
    });

    //Xử lý khi xóa thông tin thất bại
    promise.catch(function (error) {
        console.log(error);
    })
}


//------------------GET: LẤY THÔNG TIN CÓ THAM SỐ THÔNG QUA BACKEND -------------

var chinhSua = function (maSinhVien) {

    var promise = svService.chinhSuaSinhVien(maSinhVien);

    //Xử lý thành công thì gán dữ liệu từ server lên các thẻ input phía trên
    promise.then(function (result) {
        console.log(result.data);
        var sv = result.data;
        //Dom đến giao diện => gán cho input
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#email').value = sv.email;
        document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        document.querySelector('#soDienThoai').value = sv.soDienThoai;
        document.querySelector('#diemToan').value = sv.diemToan;
        document.querySelector('#diemLy').value = sv.diemLy;
        document.querySelector('#diemHoa').value = sv.diemHoa;
        document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;

    })


    //Xử lý thất bại thì log ra lỗi 
    promise.catch(function (error) {
        console.log(error)
    })

}


//---------------------- PUT: CẬP NHẬT THÔNG TIN SERVER THÔNG QUA API ---------

document.querySelector('#btnLuuThongTin').onclick = function () {

    //Lấy thông tin người dùng nhập từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    //Gọi api gửi đúng đường dẫn, phương thức, và định dạng object 
    var promise = svService.capNhatThongTinSinhVien(sv);
    //Xử lý thành công
    promise.then(function (result) {
        console.log(result.data);
        //Thành công load lại table
        loadDuLieuSinhVien();
    })
    //Xử lý thất bại
    promise.catch(function (error) {
        console.log(error);
    })
}