import React from 'react'
import AssetTypesSelectPanelHomePage from './AssetTypesSelectPanelHomePage'
import { SelectPanelItem } from './SelectPanelItem'
import { Boxes, LayoutDashboard, LifeBuoy, Newspaper, Package, Receipt, Settings, UserCircle } from "lucide-react";
import { Link } from 'react-router-dom';

function AssetTypesContainer({ children }) {
    return (
      <AssetTypesSelectPanelHomePage mainPageComponent={children}>
        <Link to='/cryptocurrencies'><SelectPanelItem icon={<LayoutDashboard size={20} />} text="Crypto" alert/></Link>
        <SelectPanelItem icon={<UserCircle size={20} />} text="Forex" alert/>
        <SelectPanelItem icon={<Boxes size={20} />} text="Indexes" alert/>
        <SelectPanelItem icon={<Package size={20} />} text="Commodity" alert/>
        <SelectPanelItem icon={<Receipt size={20} />} text="Assets" alert/>
        <Link to='/news'><SelectPanelItem icon={<Newspaper size={20} />} text="News" alert/></Link>
        <hr className="my-3"/>
        <SelectPanelItem icon={<Settings size={20} />} text="Settings" alert/>
        <SelectPanelItem icon={<LifeBuoy size={20} />} text="Help" alert/>
      </AssetTypesSelectPanelHomePage>
    )
}

export default AssetTypesContainer