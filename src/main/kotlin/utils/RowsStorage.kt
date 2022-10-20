package utils

import jakarta.servlet.http.HttpSession
import java.util.LinkedList
import kotlin.math.ceil
import kotlin.math.floor

fun getRows(session: HttpSession): String {
    val rows = session.getAttribute("rows") as LinkedList<Row>?
    if (rows != null) {
        rows.reverse()
        val stringBuilder = StringBuilder()
        for(row in rows) {
            val x = if(ceil(row.getX()!!) == floor(row.getX()!!)) row.getX()!!.toInt() else row.getX()
            val y = if(ceil(row.getY()!!) == floor(row.getY()!!)) row.getY()!!.toInt() else row.getY()
            val r = if(ceil(row.getR()!!) == floor(row.getR()!!)) row.getR()!!.toInt() else row.getR()
            stringBuilder.append("<tr>")
                .append("<td>").append(x).append("</td>")
                .append("<td>").append(y).append("</td>")
                .append("<td>").append(r).append("</td>")
                .append("<td>")
                .append(if (row.getResult()!!) "Точка попала в область" else "Точка не попала в область")
                .append("</td>")
                .append("<td>").append(row.getServerTime()).append("</td>")
                .append("<td>").append(row.getExecuteTime()).append("</td>")
                .append("</tr>")
        }
        return stringBuilder.toString()
    } else {
        return ""
    }
}


fun getJsonRows(session: HttpSession): String{
    val rows = session.getAttribute("rows") as LinkedList<Row>?
    val list = mutableListOf<String>()
    return if(rows != null){
        rows.forEach {
            list.add(it.getJson())
        }
        SerializationList(list).jsonList()
    }
    else ""
}