$(document).ready(function () {

    timeArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
    $(".currentDay").text(moment().format("dddd, MMMM Do YYYY"));

    createInputFields();
    showColorsOnInputs();

    if(localStorage.getItem("dayplannerItems") !== null) {
        dayplannerStorage = JSON.parse(localStorage.getItem("dayplannerItems"));
        loadDayplannerValues();
    } else {
        dayplannerStorage = {};
    }
    
    //------------------------------------------------------------event listeners/ storing dayplanner values
    $(".buttonRoundCorners").on("click", function () {
        var inputValue = $(this).parent().siblings("textarea").val();
        var locationValue = $(this).attr("id");

        dayplannerStorage[locationValue] = inputValue;
        localStorage.setItem("dayplannerItems", JSON.stringify(dayplannerStorage));
    });

    //---------------------------------------------------------------creating the page input fields
    function createInputFields() {
        for (var i = 0; i < timeArr.length; i++) {
            var numIndex = parseInt(i) + 9;
            var inputGroups = "<div class='input-group row'> \
                                <div class='input-group-append border-top border-bottom col-sm-1 justify-content-center'> \
                                <div class='text-center mt-3'> " + timeArr[i] + "</div> \
                                </div> \
                                <textarea class='form-control' aria-label='With textarea col-sm-8' id='" + numIndex + "' ></textarea> \
                                <div class='input-group-append col-sm-1 pl-0'> \
                                <button class='btn btn-info buttonRoundCorners btn-lg' id='" + numIndex + "' > \
                                <i class='fas fa-save'></i> \
                                </button> \
                                </div> \
                                </div>"

            $(".inputGroupsWrapper").append(inputGroups);
        }
    }

    //------------------------------------------------------------------loading day planner values on to page
    function loadDayplannerValues() {
        var storage = JSON.parse(localStorage.getItem("dayplannerItems"));
        for (var i = 0; i < timeArr.length; i++){
            var num = i + 9;
            if(storage.hasOwnProperty(num)){
                var idOfTextArea = "#" + num;
                $(idOfTextArea).val(storage[num])
            }
        }
    };

    //--------------------------------------------------------------------background colors based on current time of day
    function showColorsOnInputs() {
        for (var i = 0; i < timeArr.length; i++) {
            var currentTime = moment().format("H");
            var ids = "#" + (i + 9);
            var currentInput = parseInt($(ids).attr("id"));
            
            if (currentTime < currentInput) {
                $(ids).attr("style", "background-color: green;")
            } else if (currentTime == currentInput) {
                $(ids).attr("style", "background-color: red;")
            } else if (currentTime > currentInput) {
                $(ids).attr("style", "background-color: grey;")
            }
        };
    };
});