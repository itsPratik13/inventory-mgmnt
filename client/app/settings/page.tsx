"use client";
import Header from "@/components/Header";
import React, { useState } from "react";

type UserSettings = {
  label: string;
  value: string | boolean;
  type: "string" | "toggle";
};

const mockUserSettings: UserSettings[] = [
  { label: "Username", value: "john_doe", type: "string" },
  { label: "Email", value: "john_doe31@gmail.com", type: "string" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Language", value: "English", type: "string" },
];

const Settings = () => {
  const [userSettings, setUserSettings] =
    useState<UserSettings[]>(mockUserSettings);

  const handleToggle = (index: number) => {
    const newSettings = [...userSettings];
    newSettings[index].value = !(newSettings[index].value as boolean);
    setUserSettings(newSettings);
  };

  return (
    <div className="w-full text-white">
      <Header name="User Settings" />

      <div className="overflow-x-auto mt-5 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-zinc-800 border-b border-zinc-700">
            <tr>
              <th className="text-left py-3 px-4 uppercase text-sm font-semibold text-zinc-300">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase text-sm font-semibold text-zinc-300">
                Value
              </th>
            </tr>
          </thead>

          <tbody>
            {userSettings.map((setting, index) => (
              <tr
                key={setting.label}
                className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
              >
                <td className="py-3 px-4 text-zinc-200">
                  {setting.label}
                </td>

                <td className="py-3 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggle(index)}
                      />
                      <div
                        className="w-11 h-6 bg-zinc-700 rounded-full peer
                        peer-focus:ring-2 peer-focus:ring-indigo-600
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-indigo-600 peer-checked:after:translate-x-full"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700
                      text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
