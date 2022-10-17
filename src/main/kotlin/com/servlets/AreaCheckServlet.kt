package com.servlets

import com.servlets.serializeAnswers.Row
import java.lang.NullPointerException
import java.lang.NumberFormatException
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.math.RoundingMode
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@WebServlet(name = "areaCheckServlet", value = ["/area-check-servlet"])
class AreaCheckServlet: HttpServlet() {

    override fun doPost(request: HttpServletRequest?, response: HttpServletResponse?) {
        try {
            val x = request!!.getParameter("x").toDouble()
            val y = request.getParameter("y").toDouble()
            val R = request.getParameter("R").toDouble()

            val answer = Row(x, y, R,
                checkSuccess(x, y ,R), LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")).toString(),
                (((System.nanoTime() - request.getAttribute("startTime") as Long)/1000000).toBigDecimal().setScale(0, RoundingMode.HALF_UP)).toString() + " ms",
                !validateData(x, y, R), "OK")
            send(answer, response)

        } catch (e: NumberFormatException){
            val answer = Row(null, null, null, null, null,
                null, true, "X, Y, R must be represented by numbers")
            send(answer, response)
        }
        catch (e: NullPointerException){
            val answer = Row(null, null, null, null, null,
                null, true, "Server error")
            send(answer, response)
        }
    }

    private fun checkSuccess(x: Double, y: Double, r: Double): Boolean{
        return (x <= 0 && x >= -r && y >= 0 && y <= r/2) || //проверка на попадание в квадрат
                (x >= 0 && y <= 0 && x * x + y * y <= r/2) || //проверка на попадание в четверть окружности
                (y >= -x - r && y <= 0 && x <= 0) //проверка на попадание в треугольник
    }

    private fun validateData(x: Double, y: Double, R: Double): Boolean{
        return (x in (-3.0..5.0)) && (y in (-5.0..5.0)) && (R in (1.0..3.0))
    }

    private fun send(answer : Row, response: HttpServletResponse?){
        val json = Json.encodeToString(answer);
        response!!.setHeader("Cache-Control", "no-cache");
        response.contentType = "application/json; charset=UTF-8";
        response.writer.print(json);
    }
}

