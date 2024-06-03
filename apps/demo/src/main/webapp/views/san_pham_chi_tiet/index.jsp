<%@page pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="f" uri="jakarta.tags.functions" %>
<!DOCTYPE html>
<html>

</style>
<body>
<div>
    <table border="1">
        <thead>
        <tr>
            <th>id</th>
            <th>idMauSac</th>
            <th>idKichThuoc</th>
            <th>idSanPham</th>
            <th>maSPCT</th>
            <th>soLuong</th>
            <th>donGia</th>
            <th>trangThai</th>
            <th>Hanh Dong</th>
        </tr>

        </thead>
        <tbody>
        <c:forEach items="${data}" var="item">
            <tr>
                <td>${item.id}</td>
                <td>${item.idMauSac}</td>
                <td>${item.idKichThuoc}</td>
                <td>${item.sanPham.ten}</td>
                <td>${item.maSPCT}</td>
                <td>${item.soLuong}</td>
                <td>${item.donGia}</td>
                <td>${item.trangThai}</td>
                <td><a href="/san-pham-chi-tiet/detail/${item.id}">Xem Chi Tiet</a></td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
<footer>
    <p class="">Footer content herddde</p>
</footer>
</body>
</html>
