import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, Tooltip, Legend, RangeColorSettingsDirective, RangeColorSettingDirective } from '@syncfusion/ej2-react-charts';

const Charts = (props) => {
  
  const colorMappingData = [
    ['#FFFF99'],
    ['#FFA500'],
    ['#FF4040'],
  ];
  const rangeColorMapping = [
    { label: '1 to 5',
      start: '1',
      end: '5',
      colors: colorMappingData[0] },
  
    { label: '6 to 10',
      start: '6',
      end: '10',
      colors: colorMappingData[1] },
  
    { label: '11 to 16',
      start: '11',
      end: '16',
      colors: colorMappingData[2] },
  
  ];
  const ColorMappingPrimaryXAxis = {
    valueType: 'Category',
    majorGridLines: { width: 0 },
    title: `${props.xTitle}`,
  };
  const ColorMappingPrimaryYAxis = {
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
    title: `${props.yTitle}`,
  };
  return (
        <ChartComponent
          id={props.id}
          primaryXAxis={ColorMappingPrimaryXAxis}
          primaryYAxis={ColorMappingPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ mode: 'Range', background: 'white' }}
          tooltip={{ enable: true }}
          background='#fff'
        >
          <Inject services={[ColumnSeries, Tooltip, Category, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={props.data}
              name="Product"
              xName="x"
              yName="y"
              type="Column"
              cornerRadius={{
                topLeft: 10,
                topRight: 10,
              }}
            />
          </SeriesCollectionDirective>
          <RangeColorSettingsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {rangeColorMapping.map((item, index) => <RangeColorSettingDirective key={index} {...item} />)}
          </RangeColorSettingsDirective>
        </ChartComponent>
  );
};

export default Charts;
