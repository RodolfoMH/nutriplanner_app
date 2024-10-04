export function formatDate(date, dateFormat, time, showSeconds) {

    if (date != undefined) {
      var ano = 0, mes = 1, dia = 2;
      date = !isString(date) ? date : date.replace(/\[UTC\]*/gi, '')//Elimina el [UTC] que esta lleganmdo al final de la fecha despues de que alfre cambio el servidor.
  
      var dateTime = new Date(date);
  
      if (dateFormat == 'iso' || dateFormat == 'ISO') { return dateTime.toISOString() }
      else {
  
        var fecha = [dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate()]//dateTime.toISOString().split("T")[0].split("-");// dateToStringLocale(new Date(date)).toISOString().split("T")[0].split("-");
  
        var fechaFormateada = '';
        var timeFormateado = '';
  
        var separador = dateFormat ? dateFormat.replace(/[ymd]*/gi, '').charAt(0) : '/';
  
        var pos1 = dia, pos2 = mes, pos3 = ano;
        if (dateFormat != undefined && dateFormat != '') {
          var elementDate = dateFormat.split(separador);
  
          pos1 = getDatePos(elementDate[0].charAt(0))
          pos2 = getDatePos(elementDate[1].charAt(0))
          pos3 = getDatePos(elementDate[2].charAt(0))
        }
  
        fechaFormateada = dateFormat == '' ? '' : [paddingNumber(fecha[pos1]), paddingNumber(fecha[pos2]), paddingNumber(fecha[pos3])].join(separador);
  
        if (time) {
          var hora = dateTime.getHours(); hora = hora < 10 ? '0' + hora : hora; hora = time == '12' ? hora % 12 : hora; hora = (time == '12' && hora == 0) ? 12 : hora;
          var minuto = dateTime.getMinutes(); minuto = minuto < 10 ? '0' + minuto : minuto;
          var segundo = dateTime.getSeconds(); segundo = segundo < 10 ? '0' + segundo : segundo;
          var ampm = time == '12' ?
            dateTime.getHours() >= 12 ?
              ' PM' :
              ' AM' :
            '';
          timeFormateado = hora + ':' + minuto + (showSeconds == true ? ':' + segundo : '') + ampm;
          timeFormateado = fechaFormateada == '' ? timeFormateado : ' ' + timeFormateado;
        }
  
        return fechaFormateada + timeFormateado;
      }
  
    }
    return undefined
  }


  export function getDatePos(dateElement) {
    var dia = 2, mes = 1, ano = 0;
    switch (dateElement) {
      case 'd': { return dia }
      case 'D': { return dia }
      case 'm': { return mes }
      case 'M': { return mes }
      case 'y': { return ano }
      case 'Y': { return ano }
      default: undefined;
    }
  }


  
  export function isString(str) {
    return typeof str === "string"? true:false;
  }

  export function paddingNumber(number, fill = '0', fillCount = 1) {
    try {
      var num = parseInt(number);
      var padding = '';
  
      if (fillCount > 1) {
        for (let i = 0; i < fillCount; i++) {
          padding += fill;
  
        }
      } else {
        padding = fill;
      }
  
      return num >= 10 ? num : padding + num;
  
    } catch (error) {
      return number;
    }
  }


  export function isEmpty(value){
    if(value == undefined || value == null) return true;
    if(value == '') return true;

    return false;

  }
