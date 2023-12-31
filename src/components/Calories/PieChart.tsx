import { ResponsivePie } from '@nivo/pie'
import { MacroType } from '../../context/CaloriesContext'
import { useEffect, useState } from 'react'

type PropsType = {
    macro: MacroType
}

type ChartDataType = {
    id: string
    label: string
    value: number
}

const PieChart = ({ macro }: PropsType) => {
    const [data, setData] = useState<ChartDataType[]>([])

    useEffect(() => {
        const temp: ChartDataType[] = []
        temp.push({ id: 'carbs', label: 'carbs', value: macro.carbs })
        temp.push({ id: 'protein', label: 'protein', value: macro.protein })
        temp.push({ id: 'fat', label: 'fat', value: macro.fat })

        setData(temp)
    }, [macro])


    return (
        <>
            <div className={`px-2 py-1 rounded-xl text-2xl`}>
                {macro.day}
            </div>
            <div className={`h-[280px] w-[280px]`}>
                <ResponsivePie
                    theme={{
                        tooltip: {
                            container: {
                                background: '#000000',
                            },
                            basic: {
                                color: '#81FF81'
                            }
                        }
                    }}
                    data={data}
                    margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                    innerRadius={0.6}
                    padAngle={3}
                    cornerRadius={6}
                    activeOuterRadiusOffset={8}
                    borderWidth={3}
                    colors={['red', '#5F7FFF', '#FCEF3B']}
                    enableArcLinkLabels={false}
                    enableArcLabels={false}
                />
            </div>
            <div className={`px-2 py-1 rounded-xl text-xl`}>
                Kcal: {macro.kcal}
            </div>
        </>
    )
}

export default PieChart