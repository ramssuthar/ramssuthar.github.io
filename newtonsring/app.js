var ring = [4,6,8,10,12,14,16,18]; 

// var str1 = prompt('Do Enter Values of MSR of Right Side')
// var str2 = prompt('Enter Values of CD of Right Side')
// var str3 = prompt('Enter Values of MSR of Left Side')
// var str4 = prompt('Enter Values of CD of Left Side')

// var arrStr1 = str1.split(',');
// var arrStr2 = str2.split(',');
// var arrStr3 = str3.split(',');
// var arrStr4 = str4.split(',');

// var rightMsr = arrStr1.map(el => parseFloat(el, 10))
// var cdR = arrStr2.map(el => parseFloat(el, 10))
// var leftMsr = arrStr3.map(el => parseFloat(el, 10))
// var cdL = arrStr4.map(el => parseFloat(el, 10))

var rightMsr = [4.1,4.1,4.1,4.0,4.0,4.0,4.0,4.0]; //[4.1,4.1,4.1,4.0,4.0,4.0,4.0,4.0];
var cdR = [53,34,15,96,77,58,39,20]; //[39,20,01,82,63,44,25,06]

var leftMsr = [4.6,4.6,4.6,4.6,4.6,4.7,4.7,4.7]; //[4.7,4.7,4.7,4.7,4.7,4.8,4.8,4.8];
var cdL = [23,42,61,80,99,18,37,56]; //[23,42,61,80,99,18,37,56] [13,32,51,70,89,08,27,46]

console.log('MSR on Right Side ( From DOWN to UP ) = '+ rightMsr);
console.log('CD on Right Side ( From down to UP ) = '+ cdR);
console.log('MSR on Left Side ( From down to UP ) = '+ leftMsr);
console.log('CD on Left Side ( From down to UP ) = '+ cdL);

function arrayCalc(arr1,arr2,fn){
    var tR = [];
    for(var i=0; i < arr1.length; i++){    
       tR.push(fn(arr1[i],arr2[i])); 
   }   
    return tR;
}

function calculatetR(el1,el2){
   return (((el1*1000) + (el2))/1000).toFixed(3);
}

function dMeanCalc(dNP,fn){
    var b = [];
    for(var i=dNP.length - 1; i >=4; i--){
        b.push(fn(dNP[i],dNP[i-4]));
    }
    return b;
}
function dMean(el1,el2){
    return (el1 - el2).toFixed(4);
}

var tRRight = arrayCalc(rightMsr,cdR,calculatetR);
console.log('Total Reading Right Side = ' + tRRight);

var tRLeft = arrayCalc(leftMsr,cdL,calculatetR);
console.log('Total Reading Left Side = ' + tRLeft)

function calculateD(el1,el2){
    return (((el1*1000) - (el2*1000))/1000).toFixed(3);
}

var diameter = arrayCalc(tRLeft,tRRight,calculateD);
console.log('D (diameter) = ' + diameter);

var dsqr = diameter.map( function(el){
    return (el*el).toFixed(4);
});
console.log('D^2 (square of diameter) = ' + dsqr);

var arrDnp_Dn = dMeanCalc(dsqr,dMean)
console.log('D(n+p) - D(n) = ' + arrDnp_Dn);

function calculateAvg(el) {
    var total = 0;
    for (var i = 0; i < el.length; i += 1) {
        total += el[i]*10000;
    }
    return total / el.length;
}

var meanDnp_Dn = (calculateAvg(arrDnp_Dn))/10000;
console.log('Average of [D^2(n+p) - D^2(n)] = ' + meanDnp_Dn);

var resultLambdaTh = ((meanDnp_Dn/3840)*100000000).toFixed(0);
console.log('The Wavelength of Sodium Light is = ' + resultLambdaTh + 'Å');


var resultLambdaStd = 5893;
var percentageError = (((resultLambdaStd - resultLambdaTh)*100)/resultLambdaStd).toFixed(2);

console.log('Percentage Error = ' + percentageError +'%')


//Dom Manipulation

function printData(ring,msr_r,cd_r,tr_r,msr_l,cd_l,tr_l,diameter,diameter_s,arrDnp_Dn,meanDnp_Dn){
        for(var i = 0; i<msr_r.length; i++){
            document.querySelector('#ring-'+ i ).textContent = ring[i];
            document.querySelector('#msr-r-'+ i ).textContent = msr_r[i];
            document.querySelector('#cd-r-'+ i ).textContent = cd_r[i];
            document.querySelector('#tr-r-'+ i ).textContent = tr_r[i];
            document.querySelector('#msr-l-'+ i ).textContent = msr_l[i];
            document.querySelector('#cd-l-'+ i ).textContent = cd_l[i];
            document.querySelector('#tr-l-'+ i ).textContent = tr_l[i];
            document.querySelector('#diameter-'+ i ).textContent = diameter[i];
            document.querySelector('#diameter-s-'+ i ).textContent = diameter_s[i];
            for(var p = 0; p < arrDnp_Dn.length; p++){
                document.querySelector('#Dnp-Dn-'+ p ).textContent = arrDnp_Dn[p];
            }
        } 
        document.querySelector('#meanDnp-Dn').textContent = meanDnp_Dn;
    }
printData(ring,rightMsr,cdR,tRRight,leftMsr,cdL,tRLeft,diameter,dsqr,arrDnp_Dn,meanDnp_Dn);
