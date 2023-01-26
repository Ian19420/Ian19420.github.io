var Btn = null;
function a()
{
    Btn = document.querySelector('input[type = "radio"]:checked');
    console.log(Btn);
    var num = true;
    if (Btn != null)
    {
        Btn.onclick = function() {
            if (num)
            {
                num = false;
                Btn.checked = false;
            }
            else
            {
                num = Btn.checked;
            }
        };
    }
}
setInterval(a, 10);

var Btnsubmit = document.querySelector("[data-action = 'submit']");
Btnsubmit.onclick = function (){
    var sheet_url = "https://script.google.com/macros/s/AKfycbxNhikis3sVIDPpniXUaWRycPCMT1Apcnd6rVMj6zLh4caMvmfUtYMj0EyvNCZ7rGQc/exec";
    var lunch = Btn.name;
    var price = Btn.value;
    var myselect = document.querySelector("[name = 'number']");
    var index = myselect.selectedIndex;
    var num = myselect.options[index].text;
    $.ajax({
        type: "get",
        url: sheet_url,
        data: {
        "number": num, /* 屬性名稱需與 Google Sheet 相同 */
        "lunch": lunch,
        "price": price, 
        },
        dataType: "JSON",
        success: function(response) {
        console.log(response);
        if(response == "成功") alert("成功");
        },
    });
}