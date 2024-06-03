<%@page pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="f" uri="jakarta.tags.functions" %>
<!DOCTYPE html>
<html>

</style>
<body>
<div>
  <form>
      <div>
          <label>Id</label>
          <input name="id" value="${object.id}">
      </div>
      <div>
          <label>idMauSac</label>
          <input name="idMauSac" value="${object.idMauSac}">
      </div>
      <div>
          <label>idKichThuoc</label>
          <input name="idKichThuoc" value="${object.idKichThuoc}">
      </div>
      <div>
          <label>SanPham</label>
          <input name="sanPham" value="${object.sanPham.ten}">
      </div>
      <div>
          <label>maSPCT</label>
          <input name="maSPCT" value="${object.maSPCT}">
      </div>
      <div>
          <label>soLuong</label>
          <input name="soLuong" value="${object.soLuong}">
      </div>
      <div>
          <label>donGia</label>
          <input name="donGia" value="${object.donGia}">
      </div>
      <div>
          <label>trangThai</label>
          <select name="trangThai" value="${object.trangThai}">
              <option ${trangThai==0?"seleted":""}>Dang hoat dong</option>
              <option ${trangThai==1?"seleted":""}>Ngung hoat dong</option>
              <option></option>
          </select>
      </div>
  </form>
</div>
<footer>
    <p class="">Footer content herddde</p>
</footer>
</body>
</html>
