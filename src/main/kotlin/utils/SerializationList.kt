package utils

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class SerializationList(private val list: MutableList<String>){

    fun jsonList(): String{
        return Json.encodeToString(list)
    }

}