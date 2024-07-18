function login() {
    var uemail = document.getElementById('uemail');
    var pass = document.getElementById('pass');
    var errordisp = document.getElementById('errordisp');
    var uemailval=uemail.value;
    var passval=pass.value;
    if(uemailval==""){
        errordisp.innerHTML="<span class='errcont'>Enter Email</span>";
        uemail.focus();
        uemail.classList.add("err-focus");
        return false;
    }
    if(!uemailval.endsWith('tailwebs.com')){
        errordisp.innerHTML="<span class='errcont'>Enter Your tailwebs email</span>";
        uemail.focus();
        uemail.classList.add("err-focus");
        return false;
    }
    if(passval==""){
        pass.focus();
        pass.classList.add("err-focus");
        errordisp.innerHTML="<span class='errcont'>Enter Password</span>";
        return false;
    }
    if(passval.length < 8){
        pass.focus();
        pass.classList.add("err-focus");
        errordisp.innerHTML="<span class='errcont'>Password Must Atleast 8 characters</span>";
        return false;
    }
    var data = {
    	action: "login",
        uemail: uemailval,
        pass: passval
    };
    var encrypted = encryptData(JSON.stringify(data));
    fetch('post.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({0:encrypted}).toString()
    })
    .then(response => response.json())
    .then(result => {
        if(result.process=="success"){
            errordisp.innerHTML="<span class='succent'>redirecting</span>";
            location.href = "index.php";
        }else if(result.process=="noaccount"){
            uemail.focus();
            uemail.classList.add("err-focus");
            errordisp.innerHTML="<span class='errcont'>"+result.message+"</span>";
        }else if(result.process=="failed"){
            pass.focus();
            pass.classList.add("err-focus");
            errordisp.innerHTML="<span class='errcont'>"+result.message+"</span>";
        }else{
            console.log(result);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function getDetails(page=1){
    var data = {
        action: "allstudents",
        page: page
    };
    var encrypted = encryptData(JSON.stringify(data));
    fetch('post.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({0:encrypted}).toString()
    })
    .then(response => response.json())
    .then(result => {
        var tableHTML;
        if(result.process=="success"){
            tableHTML = '<thead><tr>';
            Object.keys(result.data[0]).forEach(function(key) {
                if (key == "id") return;
                tableHTML += '<th>' + capitalize(key) + '</th>';
            });
            tableHTML += '<th class="act">Action</th>';
            tableHTML += '</tr></thead>';
            result.data.forEach(item => {
            tableHTML += `<tr>`;
            Object.entries(item).forEach(([key, value]) => {
                if (key !== 'id') {
                    tableHTML += `<td><span class='sdisp_${item.id}' id='${key}_sr_${item.id}'>${value}</span><span class='edisp_${item.id}' style='display:none;'><input type='text' value='${value}' id='${key}_vl_${item.id}'></span></td>`;
                }
            });
            tableHTML += `
              <td class="actions">
                <div class='editremovediv sdisp_${item.id}' >
                    <span onclick="updchanges('edit', '${item.id}')"><img src='./images/edit.png'></span>&nbsp;
                    <span onclick="updchanges('remove', '${item.id}')"><img src='./images/bin.png'></span>
                </div>
                <div class='editremovediv edisp_${item.id}' style='display:none;'>
                    <span onclick="updateStudents('${item.id}')"><img src='./images/check.png'></span>&nbsp;
                    <span onclick="canceledit('${item.id}')"><img src='./images/cancel.png'></span>
                </div>
              </td>
            `;
            tableHTML += '</tr>';
          });
          tableHTML += '</tbody>';
            var tableContainer = document.getElementById('stutable');
            tableContainer.innerHTML = tableHTML;
        }else if(result.process=="nodata"){
            tableHTML = '<thead><tr>';
            tableHTML += '<th style="text-align:center;">no data found</th>';
            tableHTML += '</tr></thead>';
            var tableContainer = document.getElementById('stutable');
            tableContainer.innerHTML = tableHTML;
        }else{
            console.log(result);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function manageStudents(action="add",id=0){
    var stuname = document.getElementById('stuname');
    var subname = document.getElementById('subname');
    var mark = document.getElementById('mark');
    var perrdis = document.getElementById('perrdis');
    var stunameval = stuname.value.trim();
    var subnameval = subname.value.trim();
    var markval = mark.value.trim();
    if(stunameval==""){
        perrdis.innerHTML="<span class='perr'>Enter Student Name</span>";
        stuname.focus();
        return false;
    }
    if(subname==""){
        subname.focus();
        perrdis.innerHTML="<span class='perr'>Enter Subject Name</span>";
        return false;
    }
    var validSubjects = ["english", "tamil", "malayalam", "science", "maths", "socialstudies"];
    if(!validSubjects.includes(subnameval.toLowerCase())) {
        perrdis.innerHTML = "<span class='perr'>Enter a valid Subject Name (english, tamil, malayalam, science, maths, socialstudies)</span>";
        subname.focus();
        return false;
    }
    if(markval === "") {
        perrdis.innerHTML = "<span class='perr'>Enter Mark</span>";
        mark.focus();
        return false;
    }
    if(isNaN(markval)) {
        perrdis.innerHTML = "<span class='perr'>Mark must be a number</span>";
        mark.focus();
        return false;
    }
    if(markval>100) {
        perrdis.innerHTML = "<span class='perr'>Mark Must be Lessthan 100</span>";
        mark.focus();
        return false;
    }
    if(markval<=0) {
        perrdis.innerHTML = "<span class='perr'>Mark Must be greater than 0</span>";
        mark.focus();
        return false;
    }
    if(action=="add"){
        var data = {
            action: action,
            name: stunameval,
            subject: subnameval,
            mark: markval
        };
    }
    else if(action=="edit"){
        if(id==0){
            perrdis.innerHTML="<span class='errcont'>Error</span>";
            return false;
        }
        var data = {
            action: action,
            name: stunameval,
            subject: subnameval,
            mark: markval,
            sid:id
        };
    }else{
        return false;
    }
    var encrypted = encryptData(JSON.stringify(data));
    fetch('post.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({0:encrypted}).toString()
    })
    .then(response => response.json())
    .then(result => {
        if(result.process=="success"){
            perrdis.innerHTML="<span class='succent'>Success</span>";
            setTimeout(function() {
                closePopup();
                getDetails();
            }, 1000);
        }else if(result.process=="exists"){
            perrdis.innerHTML="<span class='errcont'>Already Exists</span>";
        }else{
            perrdis.innerHTML="<span class='errcont'>Failed Contact Support</span>";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function editremovepoptog(id){
    var showpp = document.getElementById('editremovepop'+id);
    if(showpp.style.display == 'flex'){
        showpp.style.display = 'none';
        return;
    }
    var hidepp = document.getElementsByClassName("editremovepop");
    for (var i = 0; i < hidepp.length; i++) {
        hidepp[i].style.display = 'none';
    }
    showpp.style.display = 'flex';
}
function isnumb(){
    var mark = document.getElementById('mark');
    var nonNumeric = /[^0-9]/g;
    mark.value = mark.value.replace(nonNumeric, '');
}
function capitalize(s){
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
function showpass() {
  var passwordInput = document.getElementById("pass");
  if (passwordInput.type === 'password') {
    passwordInput.type = "text";
    document.getElementById("inpicopassword").innerHTML = '<img class="icosumpass" src="./images/eye.png">';
  } else {
    passwordInput.type = "password";
    document.getElementById("inpicopassword").innerHTML = '<img class="icosumpass" src="./images/hidden.png">';
  }
}
function add(){
    document.getElementById('stuname').value = "";
    document.getElementById('subname').value = "";
    document.getElementById('mark').value = "";
    document.getElementById('perrdis').innerHTML = "";
    document.getElementById('addedithead').innerHTML = "Add Student Details";
    document.getElementById('esbtns').innerHTML = "<button  class='addbtn' type='button' onclick='manageStudents(\"add\")'>Add</button>";
    openPopup();
}
function updchanges(act,id){
    if(act=='remove'){
        if(!confirm("Are you sure you want to delete this Student details?")){
            return false;
        }
    }
    var data = {
        action: "editanddelete",
        act: act,
        sid: id
    };
    var encrypted = encryptData(JSON.stringify(data));
    fetch('post.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({0:encrypted}).toString()
    })
    .then(response => response.json())
    .then(result => {
        if(result.process=="success"){
            if(act=='remove'){
                alert("removed");
                closePopup();
                getDetails();
            }
            if(act=='edit'){
                elements=document.getElementsByClassName('edisp_'+id);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'block';
                }
                elements1=document.getElementsByClassName('sdisp_'+id);
                for (var i = 0; i < elements1.length; i++) {
                    elements1[i].style.display = 'none';
                }
            }
        }else if(result.process=="exists"){
            perrdis.innerHTML="<span class='errcont'>Already Exists</span>";
        }else{
            perrdis.innerHTML="<span class='errcont'>Failed Contact Support</span>";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function canceledit(id)
{
    elements=document.getElementsByClassName('sdisp_'+id);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
    }
    elements1=document.getElementsByClassName('edisp_'+id);
    for (var i = 0; i < elements1.length; i++) {
        elements1[i].style.display = 'none';
    }
}
function encryptData(data, key) {
    var encrypted = CryptoJS.AES.encrypt(data, "mytailweb", { format: CryptoJSAesJson }).toString();
    return encrypted;
}
var CryptoJSAesJson = {
    stringify: function (cipherParams) {
        var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
        if (cipherParams.iv) j.iv = cipherParams.iv.toString(CryptoJS.enc.Hex);
        if (cipherParams.salt) j.s = cipherParams.salt.toString(CryptoJS.enc.Hex);
        return JSON.stringify(j);
    },
    parse: function (jsonStr) {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(j.ct)
        });
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
        return cipherParams;
    }
};
function updateStudents(id=0){
    var stuname = document.getElementById('name_vl_'+id);
    var subname = document.getElementById('subject_vl_'+id);
    var mark = document.getElementById('mark_vl_'+id);
    var stunameval = stuname.value.trim();
    var subnameval = subname.value.trim();
    var markval = mark.value.trim();
    if(stunameval==""){
        alert("Enter Student Name");
        stuname.focus();
        return false;
    }
    if(subname==""){
        subname.focus();
        alert("Enter Subject Name");
        return false;
    }
    var validSubjects = ["english", "tamil", "malayalam", "science", "maths", "socialstudies"];
    if(!validSubjects.includes(subnameval.toLowerCase())) {
        alert("Enter a valid Subject Name");
        subname.focus();
        return false;
    }
    if(markval === "") {
        alert("Enter Mark");
        mark.focus();
        return false;
    }
    if(isNaN(markval)) {
        alert("Mark must be a number");
        mark.focus();
        return false;
    }
    if(markval>100) {
        alert("Mark Must be Lessthan 100");
        mark.focus();
        return false;
    }
    if(markval<=0) {
        alert("Mark Must be greater than 0");
        mark.focus();
        return false;
    }
    
        var data = {
            action: 'edit',
            name: stunameval,
            subject: subnameval,
            mark: markval,
            sid:id
        };
    
    var encrypted = encryptData(JSON.stringify(data));
    fetch('post.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({0:encrypted}).toString()
    })
    .then(response => response.json())
    .then(result => {
        if(result.process=="success"){
            alert("Details updated successfully");
            document.getElementById('name_sr_'+id).innerHTML=stunameval;
            document.getElementById('subject_sr_'+id).innerHTML=subnameval;
            document.getElementById('mark_sr_'+id).innerHTML=markval;
            canceledit(id);
            setTimeout(function() {
                getDetails();
            }, 3000);
        }else if(result.process=="exists"){
            alert("Already Exists");
        }else{
           alert("Failed Contact Support");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}