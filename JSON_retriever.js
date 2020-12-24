"use strict";

let list = {};

(function(window) {
  const listEl = document.querySelector('.table');

  function filterSongs(key, subkey1, subkey2, subkey3, subkey4, obj) {
    let arr1 = [], arr2 = [], arr3 = [], arr4 = [], array = {};
    let val1, val2, val3, val4, song_list = [], prop = key, subprop1 = subkey1, subprop2 = subkey2, subprop3 = subkey3, subprop4 = subkey4;
    array = obj;
    song_list = array[0][prop];
    console.log(array);
    console.log(song_list);
    for (let i=0; i<song_list.length; i++) {
        val1 = song_list[i][subprop1];
        val2 = song_list[i][subprop2];
        val3 = song_list[i][subprop3];
        val4 = song_list[i][subprop4];
        console.log(val1);
        console.log(val2);
        console.log(val3);
        console.log(val4);
        arr1.push(val1);
        arr2.push(val2);
        arr3.push(val3);
        arr4.push(val4);
    }
    JSON.stringify(arr1);
    JSON.stringify(arr2);
    JSON.stringify(arr3);
    JSON.stringify(arr4);
    list[subprop1] = arr1;
    list[subprop2] = arr2;
    list[subprop3] = arr3;
    list[subprop4] = arr4;
    console.log(list);
    appendText(list, subprop1, subprop2, subprop3, subprop4);
  }

  //move to another doc and combine
  function appendText(obj, prop1, prop2, prop3, prop4) {
    let rows = document.querySelectorAll(".row");
    for (let i=0; i<rows.length; i++) {
      let start = i+2;
      let columns = rows[start].querySelectorAll(".column");
      let tn1 = document.createTextNode(obj[prop1][i]), 
          tn2 = document.createTextNode(obj[prop2][i]),
          tn3 = document.createTextNode(obj[prop3][i]),
          tn4 = document.createTextNode(obj[prop4][i]);
      if (prop1 === "number")
        columns[0].appendChild(tn1);
      if (prop2 === "artist")
        columns[1].appendChild(tn2);
      if (prop3 === "title")
        columns[2].appendChild(tn3);
      if (prop4 === "user")
        columns[3].appendChild(tn4);  
    }
    console.log(obj);

  }

  function loadJSON(url) {

    let urlRequest = new Request(url, {
      method: 'GET',
      mode: 'cors'
    });

    fetch(urlRequest).then(function(response) {
      return response.json()})
      .then(function(json) {
        const json_string = JSON.stringify(json, null, '\t');
        const json_obj = JSON.parse(json_string);
        //filterSongs("song_list", "number", json_obj);
        filterSongs("song_list", "number", "artist", "title", "user", json_obj);
        //listEl.textContent = json_string;
      });

    /*
    const response = await fetch(url, {
      mode: 'no-cors'
    });
    const json_body = await response.json();
    console.log(JSON.stringify(json_body));

    const XML_HTTP_req = new XMLHttpRequest(),
    method = "GET",
    url = "http://travca.si/discord/getList.php?id=1";

    XML_HTTP_req.open(method, url);
    XML_HTTP_req.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
      }
    }
    XML_HTTP_req.send();
    */
  }

  loadJSON("https://travca.si/discord/getList.php?id=1");
})(window);
