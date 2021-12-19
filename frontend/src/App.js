import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ForcastChart from "./ForcastChart";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },
    },
}));

/*
Display the weather info (e.g., UV index, pollen, etc) 
in Cards, on the dashboard
*/
function WeatherInfoCard(props) {
    const title = props.title;
    const value = props.value;
    const index = props.index;
    return (
        <Card className="mx-12 my-8 h-128">
            <CardContent className="flex content-between flex-col">
                <Typography variant="body1">{title}</Typography>
                <Typography variant="h4" component="div">
                    {value}
                </Typography>
                <Typography variant="body2">
                    Today's {title.toLowerCase()} is {value.toLowerCase()}, with
                    an index of {index}.
                </Typography>
            </CardContent>
        </Card>
    );
}

export default function WeatherApp() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    // the incoming data, from weather API
    const [weatherData, setWeatherData] = useState(null);

    // the name of the city -- from user search input
    const [cityInput, setCityInput] = useState("");

    const [cityName, setCityName] = useState("");
    const [stateName, setStateName] = useState("");

    // the message for air quality, and pollen
    const [pollenAverage, setPollenAverage] = useState(0);
    const [pollenLabel, setPollenLabel] = useState("");
    const [airQualityMessage, setAirQualityMessage] = useState("");

    // forcast data
    let forcastDates = [];
    let forcastDataSeries = [
        {
            name: "AirQuality",
            data: [],
        },
        {
            name: "Grass",
            data: [],
        },
        {
            name: "Mold",
            data: [],
        },
        {
            name: "Ragweed",
            data: [],
        },
        {
            name: "Tree",
            data: [],
        },
        {
            name: "UVIndex",
            data: [],
        },
    ];

    const getDayFormat = (dateString) => {
        let options = { weekday: "long" };
        let dayNumber = new Date(dateString).getDay();
        return new Intl.DateTimeFormat("en-US", options).format(dayNumber);
    };
    let forcastDataValue = [];
    if (weatherData) {
        forcastDates = weatherData["DailyForecasts"].map((item) => {
            return getDayFormat(item["Date"]);
        });
        forcastDataValue = weatherData["DailyForecasts"].map((item) => {
            return item["AirAndPollen"].map((subItem) => {
                return subItem["CategoryValue"];
            });
        });

        for (let i = 0; i < forcastDataValue.length; i++) {
            forcastDataSeries[i]["data"] = forcastDataValue[i];
        }

        console.log(forcastDates);
        console.log(forcastDataValue);
        console.log(forcastDataSeries);
    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // open the profile menu
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    // Function for fetching data from forecasts api using location data from another endpoint

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    // display the results on frontend
    function displayContent() {
        if (!weatherData) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <div className="w-2/3 m-48">
                        <h1 className="text-center text-xl">
                            To see an allergy forcast, please search for a city
                            from the menu above
                        </h1>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-row items-center px-6">
                    <div className="w-2/5 h-128">
                        <Typography
                            variant="h5"
                            component="div"
                            className="text-center pt-16 px-12"
                        >
                            {airQualityMessage}
                        </Typography>

                        <div>
                            <WeatherInfoCard
                                title={"Air Quality"}
                                value={
                                    weatherData["DailyForecasts"][0]
                                        .AirAndPollen[0]["Category"]
                                }
                                index={
                                    weatherData["DailyForecasts"][0]
                                        .AirAndPollen[0]["Value"]
                                }
                            />
                            <WeatherInfoCard
                                title={"Pollen Levels"}
                                value={pollenLabel}
                                index={pollenAverage}
                            />
                            <WeatherInfoCard
                                title={"UV Index"}
                                value={
                                    weatherData["DailyForecasts"][0]
                                        .AirAndPollen[5]["Category"]
                                }
                                index={
                                    weatherData["DailyForecasts"][0]
                                        .AirAndPollen[5]["Value"]
                                }
                            />
                        </div>
                    </div>
                    <div className="w-3/5 h-128">
                        <ForcastChart
                            forcastDataSeries={forcastDataSeries}
                            forcastDates={forcastDates}
                        />
                        <Typography
                            variant="h5"
                            component="div"
                            className="text-center px-12"
                        >
                            5-Day Allergy Forcast in {cityName}, {stateName}
                        </Typography>
                    </div>
                </div>
            );
        }
    }

    // generate air quality message from a total pollen index
    function generateAirQualityMessage(pollenIndex) {
        if (pollenIndex <= 3) {
            setAirQualityMessage(
                "Great day. Safe to go out, and enjoy some fresh air!"
            );
            setPollenLabel("Low");
        } else if (pollenIndex <= 6) {
            setAirQualityMessage(
                "It's a decent day. Enjoy the outdoors, though beware if you're sensitive."
            );
            setPollenLabel("Low");
        } else if (pollenIndex <= 9) {
            setAirQualityMessage(
                "Moderate risk for allergy. If needed, bring meds/a mask if going outside."
            );
            setPollenLabel("Moderate");
        } else if (pollenIndex <= 12) {
            setAirQualityMessage(
                "High risk for allergy. Stay indoors if possible."
            );
            setPollenLabel("High");
        } else if (pollenIndex <= 15) {
            setAirQualityMessage(
                "Extremely high risk for allergy. Try to avoid all outdoor activities."
            );
            setPollenLabel("Extreme");
        } else if (pollenIndex <= 18) {
            setAirQualityMessage(
                "Extremely high risk for allergy. Avoid all outdoor activities is advised."
            );
            setPollenLabel("Extreme");
        }
    }

    // submit the search form
    function handleSearchSubmit(event) {
        const forecastUrl = `http://localhost:8000/api/weather/${cityInput}`;
        fetch(forecastUrl, {
            // posts the form to users/me/items. You need to login to be able to send this
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                let weatherInfo = JSON.parse(data["data"]["_content"]);
                setWeatherData(weatherInfo);
                setCityName(data["EnglishName"]);
                setStateName(data["AdministrativeArea"]);

                let pollenData =
                    weatherInfo["DailyForecasts"][0]["AirAndPollen"];

                let pollenSum = 0;
                for (let i = 1; i < pollenData.length; i++) {
                    if (i !== 2) {
                        pollenSum += pollenData[i].CategoryValue;
                    }
                }
                setPollenAverage(Math.round(pollenSum / 4));
                console.log(pollenSum);
                generateAirQualityMessage(pollenSum);
                console.log("weatherInfo::");
                console.log(weatherInfo);
            });
        event.preventDefault();
    }

    // handle search value change -- update the current state if needed
    function handleSearchChange(event) {
        setCityInput(event.target.value);
    }

    return (
        <div>
            <Box className="flex-grow">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            Lucid Allergy Forecast
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <form onSubmit={handleSearchSubmit}>
                                <StyledInputBase
                                    placeholder="Search for a city here..."
                                    inputProps={{ "aria-label": "search" }}
                                    type="text"
                                    value={cityInput}
                                    onChange={handleSearchChange}
                                />
                            </form>
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {renderMobileMenu}
            {renderMenu}
            {displayContent()}
        </div>
    );
}
