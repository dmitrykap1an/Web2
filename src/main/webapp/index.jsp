<%@ page import="static utils.RowsStorageKt.getRows" %>
<%@ page import="static utils.RowsStorageKt.getJsonRows" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="en">
<head>
    <title>Dmitry Kaplan</title>
    <meta charset="utf-8">
    <link rel="icon" href="img/cat.png">
    <link rel="stylesheet" href="css/index.css" type="text/css">
    <script type="text/javascript" src="js/mouseEvent.js" defer></script>
</head>
<body>
    <header>
        <h1 class="title">Laboratory work 2</h1>
    </header>
    <div>
        <div class="student_info">
            <p class="margin_text"><b>Работу выполнил</b>: Каплан Дмитрий Денисович</p>
            <p class="margin_text"><b>Группа</b>: 32131</p>
            <p class="margin_text"><b>Вариант</b>: 3157</p>
        </div>
        <div class="container">
            <div class="input-data">
                <div>
                    <div class="block_description">Выбор X</div>
                    <label> -3 </label><input type="checkbox" id="x_button1" value="-3" class="x_button" name="x">
                    <label> -2 </label><input type="checkbox" id="x_button2" value="-2" class="x_button" name="x">
                    <label> -1</label><input type="checkbox" id="x_button3" value="-1" class="x_button" name="x">
                    <label> 0</label><input type="checkbox" id="x_button4" value="0" class="x_button" name="x">
                    <label> 1</label><input type="checkbox" id="x_button5" value="1" class="x_button" name="x">
                    <label> 2</label><input type="checkbox" id="x_button6" value="2" class="x_button" name="x">
                    <label>3</label><input type="checkbox" id="x_button7" value="3" class="x_button" name="x">
                    <label>4</label><input type="checkbox" id="x_button8" value="4" class="x_button" name="x">
                    <label>5</label><input type="checkbox" id="x_button9" value="5" class="x_button" name="x">
                </div>
                <hr>
                <div>
                    <div class="block_description">Выбор Y</div>
                    <div class="error">
                        <label for="y-text">Изменение Y:</label>
                        <input type="text" name="y" id="y-text" placeholder="(-5;5)" autocomplete="off" class="y_text">
                    </div>
                </div>
                <hr>
                <div>
                    <div class="block_description">Выбор R</div>
                    <div>
                        <label></label>1<input type="checkbox" name="r" id="choice_check1" value="1" class="r-button">
                        <label>1.5</label><input type="checkbox" name="r" id="choice_check2" value="1.5" class="r-button">
                        <label>2</label><input type="checkbox" name="r" id="choice_check3" value="2" class="r-button">
                        <label>2.5</label><input type="checkbox" name="r" id="choice_check4" value="2.5" class="r-button">
                        <label>3</label><input type="checkbox" name="r" id="choice_check5" value="3" class="r-button">

                    </div>
                    <div>
                        <input type="hidden" name="real_x" value=" " id="hidden_x">
                        <input type="hidden" name="real_r" value=" " id="hidden_r">
                    </div>
                </div>
                <div id="form">
                    <input type="submit" value="Отправить" id="submit_button"  name="submit" class="submit">
                </div>
            </div>
            <div class="input-image img">
                <canvas id="area" height="280" width="400">Bro, you have to put a good browser</canvas>
                <script src="js/canvas.js"></script>
            </div>
        </div>
    </div>
    <div>
        <table class="my_table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Выполнение</th>
                <th>Время запроса</th>
                <th>Время выполнения
            </tr>
            </thead>
            <tbody id="result">
                <%=getRows(session)%>
            </tbody>
        </table>
    </div>
    <script type="text/javascript" src="js/index.js"></script>
    <script>
        resetDots(<%=getJsonRows(session)%>)
    </script>
</body>
</html>