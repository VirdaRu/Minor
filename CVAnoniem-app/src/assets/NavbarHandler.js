let isOpened = false;

function openNav(ID) {
  isOpened = true;
  document.getElementById(ID).style.width = "100%";
  document.getElementById("largeWindow").style.backgroundColor = "rgba(84, 192, 255, 0.5)";
}

function closeNav(ID) {
  isOpened = false;
  document.getElementById(ID).style.width = "0%";
  document.getElementById("largeWindow").style.backgroundColor = "rgba(84, 192, 255, 0)";
}

function changeNav(ID){
  if (isOpened === true){
    closeNav(ID);
  } else if(isOpened === false){
    openNav(ID);
  }
}
