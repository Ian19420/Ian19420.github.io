var Btn = null;
function cancel()
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
function get_time()
{
    var date = new Date();
    var year = date.getFullYear();
    var time = [];
    time[0] = date.getMonth() + 1;
    time[1] = date.getDate();
    time[2] = date.getHours();
    time[3] = date.getMinutes();
    time[4] = date.getSeconds();
    for (var x = 0; x < 5; x++)
    {
        if (String(time[x]).length < 2) time[x] = "0" + time[x];
    }
    document.getElementById("current_date").innerHTML = year + "/" + time[0] + "/" + time[1] + " " + time[2] + ":" + time[3] + ":" + time[4];
}
setInterval(get_time, 10);

var Btnsubmit = document.querySelector("[data-action = 'submit']");
Btnsubmit.onclick = function (){
    clear();
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
        }
        },
        error: function(response){
            console.log(response);
            alert("收到 但未response");
        }
    });
}
function clear()
{
    Btn.checked = false;
}