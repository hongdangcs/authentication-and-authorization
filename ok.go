package main

import (
  "fmt"
  "net/http"
  "io"
)

func main() {

  url := "https://www.hao123.com/feedData/haokanfeed?callback=jQuery110109112732284476204_1734540334178&tab=yingshi_new&video_type=1&nums=20&mode=0&_=1734540334187"
  method := "GET"

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, nil)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Cookie", "BAIDUID=817B2112F4679CA6E95BD139E17B070A:FG=1; __bsi=9620611201898178463_00_142_N_N_9209_0303_c02f_Y")

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := io.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}
