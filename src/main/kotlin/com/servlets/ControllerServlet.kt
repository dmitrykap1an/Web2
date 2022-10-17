package com.servlets

import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

@WebServlet(name = "controllerServlet", value = ["/controller-servlet"])
class ControllerServlet : HttpServlet() {

    public override fun doGet(request: HttpServletRequest, response: HttpServletResponse){
        // TODO: add 404 view
    }

    public override fun doPost(request: HttpServletRequest, response: HttpServletResponse){
        response.contentType = "text/html"
        request.setAttribute("startTime", System.nanoTime())
        val x = request.getParameter("x")
        val y = request.getParameter("y")
        val R = request.getParameter("R")

        val path = if(x == null && y == null && R == null) "/index.jsp" else "/area-check-servlet"
        servletContext.getRequestDispatcher(path).forward(request, response)
    }

}
