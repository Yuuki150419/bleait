
function line_color(event){
  if (saveCheckbox.checked){
      document.getElementById("aaa").classList.add("line_color_black"); // クラス名の追加
  }else{
      document.getElementById("aaa").classList.remove("line_color_black");// クラス名の削除
  }
}

let saveCheckbox = document.getElementById('checkbox11');
saveCheckbox.addEventListener('change', line_color);