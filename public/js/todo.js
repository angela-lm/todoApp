$(function () {
    if($('.todoList').children().length > 0){
        $('.todoList').css('display','block');
    }
    if($('.doneList').children().length > 0){
        $('.doneList').css('display','block');
    }
    $('#add').on('click',function () {
        var val = $('#todo').val();
        if(val == ''){
            // $(this).html('请输入有效值').addClass('empty');
            // setTimeout(()=>{
            //     $(this).html('+').removeClass('empty');
            // },1000);
            alert('请输入有效数据！');
        }else{
            sendData('POST',{item: val});
        }
    });
    $('.todoItem').on('click','.item-delete',function () {
        var index = $(this).attr('index');
        deleteData('DELETE',index);
    })
    $('.todoList').on('click','.item-done',function () {
        var index = $(this).parent().find('.item-delete').attr('index');
        var flag = true;
        sendData('POST',{key: index,done: flag});
    })
})
function deleteData(type,data){
    $.ajax({
        type: type,
        url: '/' + data,
        success(data) {
            location.reload();
        }
    })
}
function sendData(type,data) {
    $.ajax({
        type: type,
        url: '/',
        data: data,
        success(data) {
            location.reload();
        }
    })
}