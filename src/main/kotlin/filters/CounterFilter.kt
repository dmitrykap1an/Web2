package filters

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpFilter
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import jakarta.servlet.http.HttpSession

class CounterFilter: HttpFilter(){

    override fun doFilter(request: HttpServletRequest?, response: HttpServletResponse?, chain: FilterChain?) {
        val session = request!!.session
        var counter =  checkAttribute("counter", session)
        counter++
        session.setAttribute("counter", counter)
        servletContext.log(counter.toString())
        chain!!.doFilter(request, response)
    }

    private fun checkAttribute(attributeName: String, session: HttpSession): Int{
        val counter = session.getAttribute(attributeName) as Int?
        return if(counter == null){
            session.setAttribute(attributeName, 0)
            0
        } else{
            counter
        }
    }

}