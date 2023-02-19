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
var Btnsubmit = document.querySelector("[data-action = 'submit']");
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
    if (Math.abs(time[2]-13) < 5)
    {
        Btnsubmit.disabled = true;
        var B = document.querySelector("[name = 'time limit']");
        B.style.display = "";

    }
    for (var x = 0; x < 5; x++)
    {
        if (String(time[x]).length < 2) time[x] = "0" + time[x];
    }
    document.getElementById("current_date").innerHTML = year + "/" + time[0] + "/" + time[1] + " " + time[2] + ":" + time[3] + ":" + time[4];
}
setInterval(get_time, 10);

Btnsubmit.onclick = function (){
    if (Btn == null)
    {
        alert("請選擇你的午餐!");
        return 0;
    }
    clear();
    var lunch = Btn.value.split(" ", 2)[0];
    var price = Btn.value.split(" ", 2)[1];
    var myselect = document.querySelector("[name = 'number']");
    var index = myselect.selectedIndex;
    var number = myselect.options[index].text;
    if (number == 0)
    {
        alert("請填你的座號!");
        return 0;
    }
    var sheet_url = "https://script.google.com/macros/s/AKfycbyHRGezoGVs58M4_lXWKMJTzvhiBRdqfCpn6WdK5lWC14je2P4MuGqhqNVQ0iXx344p/exec";
    $.ajax({
        type: "get",
        url: sheet_url,
        data: {
        "number": number,
        "lunch": lunch,
        "price": price, 
        },
        dataType: "JSON",
        /*success: function(response){
        if(response == "success")
        {
            alert("success");
        }
        },
        error: function(response){
        }*/
    });
    alert("收到");
    cancel();
}
function clear()
{
    Btn.checked = false;
}
