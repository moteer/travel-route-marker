package route;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyRouteController {

    Route route = new Route();

    // @RequestMapping("/route")
    // public String route(Model model) {
    //     return "route/route";
    // }

    @RequestMapping("/mainView")
    public String mainView() {
        return "mainView";
    }

    @RequestMapping(value = "/route", method = RequestMethod.GET)
    public String displayRoutPartTable() {
        return "partials/routetable";
    }

    @RequestMapping(value = "/map/leaflet", method = RequestMethod.GET)
    public String displayLeafletMap() {
        return "partials/map/leaflet";
    }


    // @RequestMapping("/testsuite")
    // public String qunitTests() {
    //     return "testsuite";
    // }

    // @RequestMapping("/route_model_testsuite")
    // public String routeModelTests() {
    //     return "route/route_model_testsuite";
    // }

    // @RequestMapping("/route_controller_testsuite")
    // public String routeControllerTests() {
    //     return "route/route_controller_testsuite";
    // }


    // @RequestMapping(value = "route/safe", method = RequestMethod.POST)
    // @ResponseBody
    // public RoutePoint post(@RequestBody RoutePoint routePoint) {

    //     route.addPoint(routePoint);
    //     System.out.println(route);
    //     return routePoint;
    // }

}
