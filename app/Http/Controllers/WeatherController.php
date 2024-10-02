<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WeatherController extends Controller
{
    public function getDailyWeather(){
        $url = 'http://api.weatherapi.com/v1/forecast.json?key=a61568d6e8c1479297c102608242909&q=Manila&days=7&aqi=no&alerts=no';
        try {
            $client = new  \GuzzleHttp\Client();
            $response = $client->request("GET",$url);
            $data = json_decode($response->getBody(),true);
            return $data;
        } catch (\Throwable $th) {
            return ['error' => 'Unable to fetch weather data. Please try again later.'];
        }
    }
}
