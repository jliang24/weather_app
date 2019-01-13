import React from "react";

function DaysList(props) {
  if (!props.forecast || props.error) {
    return <div />;
  }

  const renderCardList = forecast => {
    const generateCard = card => {
      function getDayName(dateStr, locale) {
        var date = new Date(dateStr);
        return date.toLocaleDateString(locale, {weekday: "short"});
      }
      console.log(card);
      return (
        <div key={card.dt} className='ui card'>
          <div className='content'>
            <div className='header'>{getDayName(card.dt_txt, "en-EN")}</div>
            <div className='image'>
              <img
                alt='weather'
                src={`http://openweathermap.org/img/w/${
                  card.weather[0].icon
                }.png`}
              />
            </div>
            <div className='description'>
              {`${Math.round(card.main.temp)} \u00b0F`}
            </div>
            <div className='description'>{card.weather[0].description}</div>
          </div>
        </div>
      );
    };

    return forecast.list
      .filter(weather => weather.dt_txt.includes("12:00", 10))
      .map(item => generateCard(item));
  };

  return (
    <div className='ui red segment center aligned'>
      <div className='ui five cards'>{renderCardList(props.forecast)}</div>
    </div>
  );
}

export default DaysList;
