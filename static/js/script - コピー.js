
function line_color(event){
  if (saveCheckbox.checked){
      document.getElementById("aaa").classList.add("line_color_black"); // �N���X���̒ǉ�
  }else{
      document.getElementById("aaa").classList.remove("line_color_black");// �N���X���̍폜
  }
}

let saveCheckbox = document.getElementById('checkbox11');
saveCheckbox.addEventListener('change', line_color);