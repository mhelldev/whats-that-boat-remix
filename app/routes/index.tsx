import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({request}) => {
  const timeframe = [60, 525600];
  const time = timeframe.join(',');
  const lat = 51.3023
  const lng = 6.7355
  const url = new URL(request.url);
  const distance = url.searchParams.get('distance') || 2
  const res = await fetch(`https://www.marinetraffic.com/en/reports?asset_type=vessels&columns=time_of_latest_position:desc,
  flag,shipname,photo,recognized_next_port,reported_eta,reported_destination,current_port,imo,ship_type,show_on_
  live_map,area,lat_of_latest_position,lon_of_latest_position&time_of_latest_position_between=${time}&near_me=${lat},${lng},${distance}`, {
    headers: {
      'vessel-image': '0053e92efe9e7772299d24de2d0985adea14',
    },

  });
  const data = await res.json();
  return data
};

export default function Index() {
  const {data} = useLoaderData()
  return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>Welcome to Remix</h1>
        <ul>
          {data.map((vessel:any) => (
              <li key={vessel.SHIPNAME}>
                <div style={{}}>
                  <img className='list_photos_a_img' title='Photos of: RHEINPOESIE' alt='RHEINPOESIE'
                       src={`//photos.marinetraffic.com/ais/showphoto.aspx?shipid=${vessel.SHIP_ID}&size=thumb`}></img>
                  <div>{vessel.SHIPNAME}</div>
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
}