$(document).ready(function() {
    $(".type-button").click(function() {
        elemID = this.id;
        elemType = elemID.replace('-button', '');
        $("#type-form").html("<div class='code'><strong>&#10003; " + elemType + " Table</strong></div>")
        if (elemType === "CSV") {
            $("#step-2-csv").show();
        } else {
            $("#step-2-google").show();
        }
    });
    // The event listener for the file upload
    document.getElementById('txtFileUpload').addEventListener('change', uploadStatic, false);
    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            isCompatible = true;
        }
        return isCompatible;
    }
    // Method that reads and processes the selected file
    function uploadStatic(evt) {
        var data = null;
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
            var csv = event.target.result;
            var data = $.csv.toArrays(csv, {
                onParseValue: $.csv.hooks.castToScalar
            });
            var html = '&lt;div id="table-container" style="width:100%;" &gt;';
                html += '&lt;table id="myTable" class="stripe hover"&gt;';
            $.each(data, function(index, row) {
                //bind header
                if (index == 0) {
                    html += '&lt;thead&gt;';
                    html += '&lt;tr&gt;';
                    $.each(row, function(index, colData) {
                        html += '&lt;th&gt;';
                        html += colData;
                        html += '&lt;/th&gt;';
                    });
                    html += '&lt;/tr&gt;';
                    html += '&lt;/thead&gt;';
                    html += '&lt;tbody&gt;';
                } else {
                    html += '&lt;tr&gt;';
                    $.each(row, function(index, colData) {
                        html += '&lt;td&gt;';
                        html += colData;
                        html += '&lt;/td&gt;';
                    });
                    html += '&lt;/tr&gt;';
                }
            });
            html += '&lt;/tbody&gt;';
            html += '&lt;/table&gt;';
            html += '&lt;/div&gt;';
            html += '&lt;script alignment="true"&gt;';
            html += '$(document).ready(function() {';
            html += '$(\'#myTable\').DataTable({';
            html += 'scrollY:        \'50vh\',';
            html += 'scrollCollapse: true,';
            html += 'paging:         false,';
            html += 'rowReorder: {';
            html += 'selector: \'td:nth-child(2)\'';
            html += '},';
            html += 'responsive: true,';
            html += '"autoWidth": false';
            html += '});';
            html += '});';
            html += '&lt;/script&gt;';
            console.log(html);
            $("#step-3, #end-buttons").show();
            $('#html-return').append(html);
        };
    }

    function loadStatic() {
        var urlLink = $("#urlLink").val(),
            spreadsheetID = urlLink.substring(urlLink.lastIndexOf("/d/") + 3, urlLink.lastIndexOf("/pubhtml")),
            url = "https://docs.google.com/spreadsheet/pub?key=" + spreadsheetID + "&single=true&gid=0&output=csv",
            xmlhttp = new XMLHttpRequest();
        console.log(spreadsheetID);
        xmlhttp.onreadystatechange = function() {
            var csv = xmlhttp.responseText;
            var data = $.csv.toArrays(csv, {
                onParseValue: $.csv.hooks.castToScalar
            });
            var html = '&lt;div id="table-container" style="width:100%;" &gt;';
            html += '&lt;table id="myTable" class="stripe hover"&gt;';
            $.each(data, function(index, row) {
                if (index == 0) {
                    html += '&lt;thead&gt;';
                    html += '&lt;tr&gt;';
                    $.each(row, function(index, colData) {
                        html += '&lt;th&gt;';
                        html += colData;
                        html += '&lt;/th&gt;';
                    });
                    html += '&lt;/tr&gt;';
                    html += '&lt;/thead&gt;';
                    html += '&lt;tbody&gt;';
                } else {
                    html += '&lt;tr&gt;';
                    $.each(row, function(index, colData) {
                        html += '&lt;td&gt;';
                        html += colData;
                        html += '&lt;/td&gt;';
                    });
                    html += '&lt;/tr&gt;';
                }
            });
            html += '&lt;/tbody&gt;';
            html += '&lt;/table&gt;';
            html += '&lt;/div&gt;';
            html += '&lt;script alignment="true"&gt;';
            html += '$(document).ready(function() {';
            html += '$(\'#myTable\').DataTable({';
            html += 'scrollY:        \'50vh\',';
            html += 'scrollCollapse: true,';
            html += 'paging:         false,';
            html += 'rowReorder: {';
            html += 'selector: \'td:nth-child(2)\'';
            html += '},';
            html += 'responsive: true,';
            html += '"autoWidth": false';
            html += '});';
            html += '});';
            html += '&lt;/script&gt;';
            console.log(html);
            if (xmlhttp.readyState == 4) {
                $("#step-3, #end-buttons").show();
                $('#html-return').append(html);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    }

    function loadLive() {
        var fired = false,
            urlLink = $("#urlLink").val(),
            spreadsheetID = urlLink.substring(urlLink.lastIndexOf("/d/") + 3, urlLink.lastIndexOf("/pubhtml")),
            //url = "https://docs.google.com/spreadsheet/pub?key=" + spreadsheetID + "&single=true&gid=0&output=csv",
            url = "https://spreadsheets.google.com/tq?tqx=out:html&tq=&key=" + spreadsheetID;
        console.log(url);
        var html = '&lt;script alignment="true"&gt;';
        html += 'var url = "https://docs.google.com/spreadsheet/pub?key=' + spreadsheetID + '&single=true&gid=0&output=csv",';
        html += 'xmlhttp = new XMLHttpRequest();';
        html += 'xmlhttp.onreadystatechange = function() {';
        html += 'var csv = xmlhttp.responseText;';
        html += 'var data = $.csv.toArrays(csv, {';
        html += 'onParseValue: $.csv.hooks.castToScalar';
        html += '});';
        html += 'var html = \'&lt;table id="myTable" class="stripe hover"&gt;\';';
        html += '$.each(data, function(index, row) {';
        html += 'if (index == 0) {';
        html += 'html += \'&lt;thead&gt;\';';
        html += 'html += \'&lt;tr&gt;\';';
        html += '$.each(row, function(index, colData) {';
        html += 'html += \'&lt;th&gt;\';';
        html += 'html += colData;';
        html += 'html += \'&lt;/th&gt;\';';
        html += '});';
        html += 'html += \'&lt;/tr&gt;\';';
        html += 'html += \'&lt;/thead&gt;\';';
        html += 'html += \'&lt;tbody&gt;\';';
        html += '} else {';
        html += 'html += \'&lt;tr&gt;\';';
        html += '$.each(row, function(index, colData) {';
        html += 'html += \'&lt;td&gt;\';';
        html += 'html += colData;';
        html += 'html += \'&lt;/td&gt;\';';
        html += '});';
        html += 'html += \'&lt;/tr&gt;\';';
        html += '}';
        html += '});';
        html += 'html += \'&lt;/tbody&gt;\';';
        html += 'html += \'&lt;/table&gt;\';';
        html += 'console.log(html);';
        html += 'if (xmlhttp.readyState == 4) {';
        html += '$(\'#table-container\').append(html);';;
        html += '$(\'#myTable\').DataTable({';
        html += 'scrollY:        \'50vh\',';
        html += 'scrollCollapse: true,';
        html += 'paging:         false,';
        html += 'rowReorder: {';
        html += 'selector: \'td:nth-child(2)\'';
        html += '},';
        html += 'responsive: true,';
        html += '"autoWidth": false';
        html += '});';
        html += '}';
        html += '};';
        html += 'xmlhttp.open("GET", url, true);';
        html += 'xmlhttp.send(null);';
        html += '&lt;/script&gt;';
        html += '&lt;div id="table-container" style="width:100%;" &gt;&nbsp;&lt;/div&gt;';
        $("#step-3, #end-buttons").show();
        console.log(html);
        $("#html-return").append(html);

    }
    $("#urlSubmit").click(function() {
        if (elemType === "Static_Google_Sheet") {
            loadStatic();
        }
        if (elemType === "Live_Google_Sheet") {
            loadLive();
        }
    });
    $('#preview').click(function() {
                $("#preview-container").show();
                var preview = $("#html-return:visible").val();
                $("#preview-container").html(preview);
            });
    $('#redo').click(function() {
        location.reload();
    });
});
