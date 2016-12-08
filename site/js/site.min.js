/**
 * Created by Gian Carlo on 30/05/2016.
 */

"use strict"

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var data = allText.split('\r\n');

                var province = [];

                // function produceJSON(data) {
                //     var arr = [];
                //
                //     for (var i = 0, l = data.length; i < l; i++) {
                //         var obj = [];
                //         var split = data[i].split(" / ");
                //
                //         if(!obj.includes(split[0].split(" ")[0])){
                //             obj = split[0].split(" ")[0];
                //         }
                //
                //         arr.push(obj);
                //     }
                //     return arr;
                // }
                //
                // var dataX = produceJSON(data);
                // console.log(dataX);

                // var seen = {};
                // dataX = dataX.filter(function(entry) {
                //     var previous;
                //
                //     // Have we seen this label before?
                //     if (seen.hasOwnProperty(entry.label)) {
                //         // Yes, grab it and add this data to it
                //         previous = seen[entry.label];
                //         previous.data.push(entry.data);
                //         previous.distrito.push(entry.distrito);
                //
                //         // Don't keep this entry, we've merged it into the previous one
                //         return false;
                //     }
                //
                //     // entry.data probably isn't an array; make it one for consistency
                //     if (!Array.isArray(entry.data)) {
                //         entry.data = [entry.data];
                //     }
                //
                //     if (!Array.isArray(entry.distrito)) {
                //         entry.distrito = [entry.distrito];
                //     }
                //
                //     // Remember that we've seen it
                //     seen[entry.label] = entry;
                //
                //     // Keep this one, we'll merge any others that match into it
                //     return true;
                // });
                // console.log(dataX);

                for (var i = 0; i < data.length; i++) {

                    var split = data[i].split(" / "),
                        firstLVL,
                        secondLVL,
                        thirdLVL;

                    if( (split.length - 1) < 1){
                        firstLVL = split[0];

                        province.push([
                            firstLVL.split(" ")[0],
                            firstLVL.split(" ")[1],
                            []
                        ]);
                    }

                    if( (split.length - 1) === 1){
                        secondLVL = split;

                        var unique = secondLVL.filter(function(elem, index, self) {
                            return index == self.indexOf(elem);
                        });

                        console.log(unique.length);

                        // for (var i = 0; i < unique.length; i += 1) {
                        //     var p1 = province[i];
                        //     console.log(province);
                        //     if (p1[0] === secondLVL[0].split(" ")[0]) {
                        //         province[i][2].push(secondLVL[i]);
                        //         province[i][2].push(secondLVL[i+1]);
                        //     }
                        // }
                    }
                }

                console.log(province);
            }
        }
    }
    rawFile.send(null);
}

readTextFile("/site/data.txt");

// var data = [
//         {
//             label: "Book1",
//             data: "US edition"
//         },
//         {
//             label: "Book1",
//             data: "UK edition"
//         },
//         {
//             label: "Book1",
//             data: "UK edition"
//         },
//         {
//             label: "Book2",
//             data: "CAN edition"
//         }
//     ];
//
// var seen = {};
// data = data.filter(function(entry) {
//     var previous;
//
//     // Have we seen this label before?
//     if (seen.hasOwnProperty(entry.label)) {
//         // Yes, grab it and add this data to it
//         previous = seen[entry.label];
//         previous.data.push(entry.data);
//
//         // Don't keep this entry, we've merged it into the previous one
//         return false;
//     }
//
//     // entry.data probably isn't an array; make it one for consistency
//     if (!Array.isArray(entry.data)) {
//         entry.data = [entry.data];
//     }
//
//     // Remember that we've seen it
//     seen[entry.label] = entry;
//
//     // Keep this one, we'll merge any others that match into it
//     return true;
// });
//
// console.log(data);