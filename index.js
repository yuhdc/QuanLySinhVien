//Khai báo sự kiện khi người dùng click vào nút xác nhận

var validate = new Validation();
var mangSinhVien = []; //Mảng chứa nội dung sinh viên được người dùng thêm vào sau khi nhập liệu

document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo đối tượng chứa dữ liệu nhập từ người dùng
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.email = document.querySelector('#email').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    console.log('sinh viên', sv);

    //----------------Kiểm tra dữ liệu hợp lệ ----------------
    // -------Kiểm tra rổng-----------
    var valid = true;

    valid &= validate.kiemTraRong(sv.maSinhVien, 'Mã sinh viên', '#kiemTraRong-maSinhVien') & validate.kiemTraRong(sv.tenSinhVien, 'Tên sinh viên', '#kiemTraRong-tenSinhVien') & validate.kiemTraRong(sv.email, 'Email', '#kiemTraRong-email') & validate.kiemTraRong(sv.soDienThoai, 'Số ĐT', '#kiemTraRong-soDienThoai') & validate.kiemTraRong(sv.diemToan, 'Điểm toán', '#kiemTraRong-diemToan') & validate.kiemTraRong(sv.diemLy, 'Điểm lý', '#kiemTraRong-diemLy') & validate.kiemTraRong(sv.diemHoa, 'Điểm hóa', '#kiemTraRong-diemHoa') & validate.kiemTraRong(sv.diemRenLuyen, 'Điểm rèn luyện', '#kiemTraRong-diemRenLuyen');

    // Kiểm tra định dạng
    valid &= validate.kiemTraTatKyTu(sv.tenSinhVien, 'Tên sinh viên', '#kiemTraDinhDang-tenSinhVien') & validate.kiemTraEmail(sv.email, 'Email', '#kiemTraDinhDang-email') & validate.kiemTraTatCaLaSo(sv.soDienThoai, 'Số điện thoại', '#kiemTraDinhDang-soDienThoai') & validate.kiemTraTatCaLaSo(sv.diemToan, 'Điểm toán', '#kiemTraDinhDang-diemToan') & validate.kiemTraTatCaLaSo(sv.diemLy, 'Điểm lý', '#kiemTraDinhDang-diemLy') & validate.kiemTraTatCaLaSo(sv.diemHoa, 'Điểm hóa', '#kiemTraDinhDang-diemHoa') & validate.kiemTraTatCaLaSo(sv.diemRenLuyen, 'Điểm rèn luyện', '#kiemTraDinhDang-diemRenLuyen');
    //Kiểm tra độ dài
    valid &= validate.kiemTraDoDai(sv.maSinhVien, 'Mã sinh viên', '#kiemTraDoDai-maSinhVien', 4, 6);
    //Kiểm tra giá trị 
    valid &= validate.kiemTraGiaTri(sv.diemToan, 'Điểm toán', '#kiemTraGiaTri-diemToan', 0, 10) & validate.kiemTraGiaTri(sv.diemLy, 'Điểm lý', '#kiemTraGiaTri-diemLy', 0, 10) & validate.kiemTraGiaTri(sv.diemHoa, 'Điểm hóa', '#kiemTraGiaTri-diemHoa', 0, 10) & validate.kiemTraGiaTri(sv.diemRenLuyen, 'Điểm rèn luyện', '#kiemTraGiaTri-diemRenLuyen', 0, 10);


    if (!valid) {
        return;
    }

    //Mỗi khi người dùng xác nhận thêm sinh viên vào mảng
    mangSinhVien.push(sv);

    console.log('mảng sinh viên', mangSinhVien);

    //Gọi hàm tạo bảng
    renderTableSinhVien(mangSinhVien);
    //Gọi hàm lưu mảng sinh viên vào local storage
    luuDuLieuLocalStorage();
}


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
    console.log(noiDungTable);
}

//Định nghĩa hàm xử lý chức năng cho nút chỉnh sửa
var chinhSua = function (maSV) {
    //Khi bấm chỉnh sửa tắt nút xác nhận và disabled maSinhVien
    document.querySelector('#maSinhVien').disabled = true;
    document.querySelector('#btnXacNhan').disabled = true;
    document.querySelector('#btnLuuThongTin').disabled = false;
    for (var i = 0; i < mangSinhVien.length; i++) {
        var sv = mangSinhVien[i];
        if (sv.maSinhVien === maSV) {
            //Lấy nội dung sinh viên được click gán lên các input phía trên
            document.querySelector('#maSinhVien').value = sv.maSinhVien;
            document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
            document.querySelector('#email').value = sv.email;
            document.querySelector('#soDienThoai').value = sv.soDienThoai;
            document.querySelector('#diemToan').value = sv.diemToan;
            document.querySelector('#diemLy').value = sv.diemLy;
            document.querySelector('#diemHoa').value = sv.diemHoa;
            document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
            document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        }
    }
}

//Định nghĩa sự kiện cho button#LuuThongTin => Sau khi người dùng thay đổi
document.querySelector('#btnLuuThongTin').onclick = function () {
    //Tạo đối tượng lấy thông tin người dùng sau khi thay đổi
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.email = document.querySelector('#email').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    //Tìm ra sinh viên trong mảng có mã trùng với mã người dùng sau khi thay đổi
    for (var i = 0; i < mangSinhVien.length; i++) {
        var svUpdate = mangSinhVien[i];
        if (svUpdate.maSinhVien === sv.maSinhVien) {
            //Cập nhật lại từng giá trị thuộc tính của sinh viên trong mảng
            svUpdate.tenSinhVien = sv.tenSinhVien;
            svUpdate.email = sv.email;
            svUpdate.soDienThoai = sv.soDienThoai;
            svUpdate.diemToan = sv.diemToan;
            svUpdate.diemLy = sv.diemLy;
            svUpdate.diemHoa = sv.diemHoa;
            svUpdate.diemRenLuyen = sv.diemRenLuyen;
            svUpdate.loaiSinhVien = sv.loaiSinhVien;
            document.querySelector('#maSinhVien').disabled = false;

            luuDuLieuLocalStorage();
            //Khi lưu thông tin xong bật nút thêm và ẩn nút lưu
            document.querySelector('#maSinhVien').disabled = false;
            document.querySelector('#btnXacNhan').disabled = false;
            document.querySelector('#btnLuuThongTin').disabled = true;
            renderTableSinhVien(mangSinhVien);
        }
    }
}



//Định nghĩa hàm khi nút xóa sinh viên click
var xoaSinhVien = function (maSV) {
    // alert(maSV);
    for (var i = mangSinhVien.length - 1; i >= 0; i--) {
        //Mỗi lần duyệt lấy ra 1 sinh viên trong mảng
        var sv = mangSinhVien[i];
        //Kiểm tra sinh nào trong mảng có maSinhVien === maSV được click thì xóa
        if (sv.maSinhVien === maSV) {
            mangSinhVien.splice(i, 1); //Xóa tại vị trí index tìm được và xóa 1 phần tử
        }
    }
    //Gọi hàm tạo lại bảng truyền vào mangSinhVien sau khi xóa
    renderTableSinhVien(mangSinhVien);
    //Có thể lưu vào localstorage 
    // luuDuLieuLocalStorage()
}


var luuDuLieuLocalStorage = function () {

    //Biến mangSinhVien thành chuỗi 
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    //Lưu dữ liệu vào localstorage bằng phương thức setItem(key,value);
    localStorage.setItem('mangSinhVien', sMangSinhVien)

}


var layDuLieuLocalStorage = function () {
    //Kiểm tra xem localstorage có dữ liệu hay không
    if (localStorage.getItem('mangSinhVien')) {
        //Dữ liệu được lấy từ localstorage là dạng chuỗi
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        //Biến chuỗi dữ liệu thành mảng và gán cho biến mangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien);
        //Gọi hàm tạo bảng sinh viên từ mangSinhVien được lấy giá trị từ localstorage
        renderTableSinhVien(mangSinhVien);
    }
}

//Gọi hàm load data từ storage khi browser load
layDuLieuLocalStorage();


