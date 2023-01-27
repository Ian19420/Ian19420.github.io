var Btn = null;
function a()
{
    var num = true;
    Btn = document.querySelector('input[type = "radio"]:checked');
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
    var sheet_url = "https://script.google.com/macros/s/AKfycbyHRGezoGVs58M4_lXWKMJTzvhiBRdqfCpn6WdK5lWC14je2P4MuGqhqNVQ0iXx344p/exec";
    var lunch = Btn.value.split(" ", 2)[0];
    var price = Btn.value.split(" ", 2)[1];
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
        if(response == "success")
        {
            alert("success");
            clear();
        }
        },
        error: function(response){
            console.log(response);
            alert("error");
        }
    });
}
function clear()
{
    Btn.checked = false;
}