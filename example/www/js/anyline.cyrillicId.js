/*
 * Anyline Cordova Plugin
 * anyline.cyrillicId.js
 *
 * Copyright (c) 2016 Anyline GmbH
 */

if (anyline === undefined) {
    var anyline = {};
}
anyline.cyrillicId = {
onResult: function (result) {
    changeLoadingState(false);
    //this is called for every cyrillic id scan result
    //the result is a json-object containing all the scaned values and check-digits
    console.log("cyrillic Id result: " + JSON.stringify(result));
    var div = document.getElementById('results');

    if (div.childElementCount >= 3) {
        div.removeChild(div.childNodes[div.childElementCount - 1]);
    }

    var s = "<p>" + "<img src=\"" + result.imagePath + "\" width=\"100%\" height=\"auto\"/><br/>";
    console.log("s 1: " + s);
    console.log("result length: " + result.length);

    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        var val = result[key];
        if (key != "imagePath" && key != "fullImagePath" )
            s = s.concat("<br/><b>" + key + ": </b>" + val);
        console.log("-------------- key, value: " + key + " - " + val);
      }
    }



    s = s.concat ("</p>");
    console.log("s 3: " + s);
    div.innerHTML = s;

    document.getElementById("details_scan_modes").removeAttribute("open");
    document.getElementById("details_results").setAttribute("open", "");
    window.scrollTo(0, 0);
},
    
onError: function (error) {
    changeLoadingState(false);
    //called if an error occurred or the user canceled the scanning
    if (error == "Canceled") {
        //do stuff when user has canceled
        // this can be used as an indicator that the user finished the scanning if canclelOnResult is false
        console.log("cyrillic Id scanning canceled");
        return;
    }
    
    alert(error);
},
    
anylineCyrillicIdViewConfig: {
  "camera" : {
    "captureResolution" : "1080p",
    "zoomGesture": true
  },
  "flash" : {
    "mode": "manual",
    "alignment": "bottom_right",
    "imageOn": "flash_on",
    "imageOff": "flash_off"
  },
  "viewPlugin" : {
    "plugin":{
      "id":"ID",
      "idPlugin": {
        "universalIdConfig": {
          "alphabet": "cyrillic",
          "faceDetection": true,
          "allowedLayouts": {
            "mrz": [],
            "idFront": [],
            "drivingLicense": []
          },
          "idFront": {
            "fullName": {"scanOption": 0, "minConfidence": 60},
            "dateOfBirth": {"scanOption": 0, "minConfidence": 60},
            "placeOfBirth": {"scanOption": 1, "minConfidence": 60},
            "dateOfExpiry": {"scanOption": 1, "minConfidence": 60},
            "documentNumber": {"scanOption": 0, "minConfidence": 60},
            "nationality": {"scanOption": 1, "minConfidence": 60}
          },
          "drivingLicense": {
            "fullName": {"scanOption": 0, "minConfidence": 60},
            "dateOfBirth": {"scanOption": 0, "minConfidence": 60},
            "placeOfBirth": {"scanOption": 1, "minConfidence": 60},
            "dateOfExpiry": {"scanOption": 1, "minConfidence": 60},
            "documentNumber": {"scanOption": 0, "minConfidence": 60},
            "nationality": {"scanOption": 0, "minConfidence": 60}
          }
        }
      }
    },
    "cutoutConfig" : {
      "style": "animated_rect",
      "maxWidthPercent": "90%",
      "maxHeightPercent": "90%",
      "alignment": "center",
      "strokeWidth": 3,
      "cornerRadius": 8,
      "strokeColor": "FFFFFF",
      "outerColor": "000000",
      "outerAlpha": 0.3,
      "ratioFromSize" : {
        "width": 50,
        "height": 31
      },
      "cropPadding": {
        "x": -50,
        "y": -50
      },
      "cropOffset": {
        "x": 0,
        "y": 0
      },
      "feedbackStrokeColor": "0099FF"
    },
    "scanFeedback" : {
      "style": "CONTOUR_RECT",
      "visualFeedbackRedrawTimeout": 100,
      "strokeColor": "0099FF",
      "fillColor" : "220099FF",
      "beepOnResult": true,
      "vibrateOnResult": true,
      "strokeWidth": 2
    },
    "cancelOnResult" : true
  }
},
    
scan: function () {
    if (localStorage.getItem("hasStartedAnyline") === 'true') {
        return;
    }
    changeLoadingState(true);
    // start the cyrillicId scanning
    // pass the success and error callbacks, as well as the license key and the config to the plugin
    // see http://documentation.anyline.io/#anyline-config for config details
    // and http://documentation.anyline.io/#universalId for module details
    
    var licenseKey = "ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9wdC1vdXQiLAogICJpbWFnZVJlcG9ydENhY2hpbmciOiBmYWxzZSwKICAibWFqb3JWZXJzaW9uIjogIjI1IiwKICAibWF4RGF5c05vdFJlcG9ydGVkIjogNSwKICAiYWR2YW5jZWRCYXJjb2RlIjogdHJ1ZSwKICAibXVsdGlCYXJjb2RlIjogdHJ1ZSwKICAic3VwcG9ydGVkQmFyY29kZUZvcm1hdHMiOiBbCiAgICAiQUxMIgogIF0sCiAgInBpbmdSZXBvcnRpbmciOiB0cnVlLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiLAogICAgIldpbmRvd3MiCiAgXSwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgInNob3dQb3BVcEFmdGVyRXhwaXJ5IjogdHJ1ZSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiA5MCwKICAidmFsaWQiOiAiMjAyMi0wNS0zMCIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiaW8uYW55bGluZS5leGFtcGxlcy5jb3Jkb3ZhLmJldGEiLAogICAgImlvLmFueWxpbmUuZXhhbXBsZXMuY29yZG92YSIsCiAgICAiaW8uYW55bGluZS5leGFtcGxlcy5jb3Jkb3ZhLmdpdGh1YiIKICBdLAogICJhbmRyb2lkSWRlbnRpZmllciI6IFsKICAgICJpby5hbnlsaW5lLmV4YW1wbGVzLmNvcmRvdmEiCiAgXSwKICAid2luZG93c0lkZW50aWZpZXIiOiBbCiAgICAiaW8uYW55bGluZS5leGFtcGxlcy5jb3Jkb3ZhIgogIF0KfQppUHBkbWNiZlpSL2VkYlpCVUs0a2JObm1TdXV0eVFKS3p6aGRpWk5KaTdnZUszcUNmemEyQ1JnTnA2b3lSSjhUSGJzWDd6eWR1eW1XZmdXTEdHQTBJb0pMMmZNUEtiRE1DUitVNmhML0xGMVJpV0hXOXlrQ2x6S1dzd2VsZG1EN2U2RmlGeG8xY3cxckI2SUFLdEJsU05lQXZra1FPM1U4Ym5LbWtVUHRFaWl6Ylk1M3RvaSsreTc0bW0zeEVkY0tNQ0wwZXozb01NdWtETFoza3hmZU5Db3F5bXFwak05MCt6OWFWTVY1OHp4MFRzL0VsNXcyUEJoU1BWUDZ6STZUN3NzQm1HMjg4YWpGMEFQUm9BVVFjeWx4VndlWjFkbGcxQUZ5WVBPNGs3bjVBVk1GbDBYK1VjcWJQcVdac0hIbGRXaERGZkQ1ZG5zcHVUZVdBTVZ4akE9PQ==";
    

    cordova.exec(this.onResult, this.onError, "AnylineSDK", "scan", [licenseKey, this.anylineCyrillicIdViewConfig]);
}
};

