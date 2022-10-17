package com.servlets.serializeAnswers

import kotlinx.serialization.Serializable


@Serializable
data class Row(
    private val x: Double?, private val y: Double?, private val R: Double?, private val result: Boolean?,
    private val serverTime: String?, private val executeTime: String?, private val error: Boolean, private val message: String)