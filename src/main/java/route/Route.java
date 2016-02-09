package route;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Route implements Serializable {

    private List<RoutePoint> routePoints = new ArrayList<>();

    public Route() {
        System.out.println("Route without any params");
    }

    public List<RoutePoint> getRoutePoints() {
        return routePoints;
    }

    public void setRoutePoints(List<RoutePoint> routePoints) {
        this.routePoints = routePoints;
    }

    @Override
    public String toString() {

        StringBuilder appender = new StringBuilder().append("Route Points");
        for (RoutePoint routePoint : routePoints) {
            appender.append("Point: [ ")
            .append("{lng:")
            .append(routePoint.getLongitude())
            .append("lat:")
            .append(routePoint.getLatitude())
            .append("} ");
        }
        appender.append("]");
        return appender.toString();
    }

    public void addPoint(RoutePoint routePoint) {
        routePoints.add(routePoint);
    }
}
