function addToCart(id,quantity) {
    let data = { productId: id, quantity: quantity };
    $.ajax({
        type: "POST",
        url: 'https://localhost:5021/Cart/AddToCart',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: () => getCartSize()
    })
}
function increaseItemQuantity(id) {
    let data = { productId: id, quantity: 1 };
    $.ajax({
        type: "POST",
        url: 'https://localhost:5021/Cart/UpdateQuantity',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (res) => {
            getCartSize()
            $("#cartlist").html(res)
        }
    })
}
function decreaseItemQuantity(id, currentQty) {
    if (currentQty <= 1) return;
    let data = { productId: id, quantity: -1 };
    $.ajax({
        type: "POST",
        url: 'https://localhost:5021/Cart/UpdateQuantity',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (res) => {
            getCartSize()
            $("#cartlist").replaceWith(res)
        }
    })
}
function deleteItem(id) {
    $(`#removeModal_${id}`).on('hidden.bs.modal', function (e) {
        $.ajax({
            type: "DELETE",
            url: `https://localhost:5021/Cart/DeleteItem/${id}`,
            success: (res) => {
                getCartSize()
                $("#cartlist").replaceWith(res)
            }
        })
    })
    
}
function getCartSize() {

    $.ajax({
        type: "GET",
        url: 'https://localhost:5021/Cart/GetSize',
        success: function (res) {
            $("#cartbadge").html(res);
        }
    })

}
getCartSize();
