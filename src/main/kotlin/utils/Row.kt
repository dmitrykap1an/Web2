package utils

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json


@Serializable
data class Row(
    private val x: Double?, private val y: Double?, private val R: Double?, private val result: Boolean?,
    private val serverTime: String?, private val executeTime: String?, private val error: Boolean, private var message: String){

    fun getX() = x
    fun getY() = y

    fun getR() = R

    fun getResult() = result

    fun getServerTime() = serverTime

    fun getExecuteTime() = executeTime

    fun getError() = error

    fun setMessage(mes: String){
        message = mes
    }

    fun getJson(): String{
        return Json.encodeToString(this)
    }
}