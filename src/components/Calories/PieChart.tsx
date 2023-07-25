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
        console.log(macro)
        const temp: ChartDataType[] = []
        temp.push({ id: 'carbs', label: 'carbs', value: macro.carbs })
        temp.push({ id: 'protein', label: 'protein', value: macro.protein })
        temp.push({ id: 'fat', label: 'fat', value: macro.fat })

        setData(temp)
    }, [macro])


    return (
        <>
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
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.6}
                padAngle={3}
                cornerRadius={6}
                activeOuterRadiusOffset={8}
                borderWidth={3}
                colors={['red', '#5F7FFF', '#FCEF3B']}
                enableArcLinkLabels={false}
                enableArcLabels={false}
            />
        </>
    )
}

export default PieChart