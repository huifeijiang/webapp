/**
 * Created by haibalai on 2017/9/28.
 */

export const popupTemple = {};




popupTemple.getTemple = function (roleName,phone,location,picImg) {

    let template = `  <div class="maptip f_clear">
    <div class="mapre">
      <img onclick=window.postMessage('123','*') class="imaaa" src="static/v2images/closeqq.png"/>
      <div class="maptip-le"> <img class="maptiprole-img" src="${picImg}"/></div>
      <div class="maptop-ri">
        <div>
          <span class="clor">${roleName}</span>
        </div>
        <div class="top-pp">
          <img class="spealll" src="static/v2images/telcall.png"/>
          <span class="clor"> <a href="tel:${phone}">${phone}</span>
        </div>
        <div>
          <img class="twoa" src="static/v2images/dingweiq.png"/>
          <span class="clor">${location}</span>
        </div>
      </div>
    </div>
  </div>`

  return template;

}
