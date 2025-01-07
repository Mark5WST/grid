<template>
  <div class="w-full flex flex-row justify-between items-center">
    <h1 class="font-semibold text-xl">ตารางเปรียบเทียบข้อมูล</h1>
    <div class="space-x-2">
      <button v-if="!editMode" class="btn bg-white" @click="changeEditMode">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
        แก้ไขข้อมูล
      </button>
      <button v-if="editMode" class="btn bg-white" @click="changeEditMode">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        ยกเลิก
      </button>
      <div v-if="!editMode" class="join btn-neutral">
        <button
          class="btn join-item text-neutral-content"
          @click="exportToExcelAll"
        >
          ดาวน์โหลดไฟล์ทั้งหมด
        </button>
        <div class="dropdown dropdown-end">
          <button tabindex="0" class="btn join-item text-neutral-content">
            <!-- Dropdown Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </button>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-44 text-base-content"
          >
            <li @click="exportToExcelPart1"><a>ดาวน์โหลด Part 1</a></li>
            <li @click="exportToExcelPart2"><a>ดาวน์โหลด Part 2</a></li>
            <li @click="exportToExcelPart3"><a>ดาวน์โหลด Part 3</a></li>
            <li @click="exportToExcelPart4"><a>ดาวน์โหลด Part 4</a></li>
          </ul>
        </div>
      </div>

      <button v-if="editMode" class="btn btn-neutral" @click="saveChange">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1667 17.5V10.8333H5.83333V17.5M5.83333 2.5V6.66667H12.5M15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H13.3333L17.5 6.66667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        บันทึกข้อมูล
      </button>
    </div>
  </div>

  <div
    class="overflow-x-auto w-full bg-gray-50 border border-gray-300 rounded-lg"
  >
    <table class="table table-zebra bg-red-50">
      <thead>
        <tr>
          <th class="min-w-36">รายละเอียด</th>
          <th
            v-for="(value, key) in inputs"
            :key="key"
            class="min-w-48"
            draggable="true"
            @dragstart="onDragStart(key)"
            @dragover.prevent
            @drop="onDrop(key)"
          >
            <div
              v-if="value != ''"
              class="w-full flex justify-between items-center"
            >
              <span class="text-neutral truncate">
                {{ value }}
              </span>
              <button
                v-if="key != 'input1'"
                class="btn btn-sm bg-white border-dashed border-2 text-sm font-thin"
                @click="handlePickInput(key, value)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
            <button
              v-else
              class="btn btn-sm bg-white border-dashed border-2 text-sm font-thin"
              @click="handlePickInput(key, value)"
            >
              + เลือกสินทรัพย์
            </button>
          </th>
        </tr>
      </thead>
      <tr class="border-y-2 border-gray-300">
        <td>Section1</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tbody class="bg-white">
        <tr class="max-h-32">
          <td class="align-top">รูปภาพ</td>
          <td>
            <div class="">
              <img
                :src="displayImage(getValue(inputs.input1, 'filepath1'))"
                alt="image1"
                srcset=""
              />
            </div>
          </td>
          <td>
            <div class="">
              <img
                :src="displayImage(getValue(inputs.input2, 'filepath1'))"
                alt="image2"
                srcset=""
              />
            </div>
          </td>
          <td>
            <div class="">
              <img
                :src="displayImage(getValue(inputs.input3, 'filepath1'))"
                alt="image3"
                srcset=""
              />
            </div>
          </td>
          <td>
            <div class="">
              <img
                :src="displayImage(getValue(inputs.input4, 'filepath1'))"
                alt="image4"
                srcset=""
              />
            </div>
          </td>
          <td>
            <div class="">
              <img
                :src="displayImage(getValue(inputs.input5, 'filepath1'))"
                alt="image5"
                srcset=""
              />
            </div>
          </td>
          <td>
            <div class="">
              <img
                :src="displayImage(getValue(inputs.input6, 'filepath1'))"
                alt="image6"
                srcset=""
              />
            </div>
          </td>
        </tr>
        <tr
          v-for="(value, key) in fields.section1
            .filter(
              (field) =>
                field[`bank_${bank}`] === 1 && field[`sp_type${sp_type}`] === 1
            )
            .sort((a, b) => {
              const orderA = a[`order_${bank}`] || Number.MAX_VALUE;
              const orderB = b[`order_${bank}`] || Number.MAX_VALUE;
              return orderA - orderB;
            })"
          :key="key"
        >
          <td>{{ value.name_th }}</td>
          <td>
            <div
              v-if="editMode && inputs.input1 !== ''"
              class="join join-horizontal border-2 border-solid"
            >
              <input
                class="input input-sm input-bordered join-item w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues1[value.field_input]"
              />
              <!-- <span class="join-item p-2">N</span> -->
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input1, value.field_input)) }}
            </div>
          </td>
          <td>
            <div
              v-if="editMode && inputs.input2 !== ''"
              class="join join-horizontal border-2 border-solid"
            >
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues2[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input2, value.field_input)) }}
            </div>
          </td>
          <td>
            <div
              v-if="editMode && inputs.input3 !== ''"
              class="join join-horizontal border-2 border-solid"
            >
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues3[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input3, value.field_input)) }}
            </div>
          </td>
          <td>
            <div v-if="editMode && inputs.input4 !== ''">
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues4[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input4, value.field_input)) }}
            </div>
          </td>
          <td>
            <div v-if="editMode && inputs.input5 !== ''">
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues5[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input5, value.field_input)) }}
            </div>
          </td>
          <td>
            <div v-if="editMode && inputs.input6 !== ''">
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues6[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input6, value.field_input)) }}
            </div>
          </td>
        </tr>
      </tbody>
      <tr class="border-y-2 border-gray-300">
        <td>Section2</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tbody class="bg-white">
        <tr
          v-for="(value, key) in fields.section2
            .filter(
              (field) =>
                field[`bank_${bank}`] === 1 && field[`sp_type${sp_type}`] === 1
            )
            .sort((a, b) => {
              const orderA = a[`order_${bank}`] || Number.MAX_VALUE;
              const orderB = b[`order_${bank}`] || Number.MAX_VALUE;
              return orderA - orderB;
            })"
          :key="key"
        >
          <td>{{ value.name_th }}</td>
          <td>
            <div
              v-if="editMode && inputs.input1 !== ''"
              class="join join-horizontal border-2 border-solid"
            >
              <input
                class="input input-sm input-bordered join-item w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues1[value.field_input]"
              />
              <!-- <span class="join-item p-2">N</span> -->
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input1, value.field_input)) }}
            </div>
          </td>
          <td>
            <div
              v-if="editMode && inputs.input2 !== ''"
              class="join join-horizontal border-2 border-solid"
            >
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues2[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input2, value.field_input)) }}
            </div>
          </td>
          <td>
            <div
              v-if="editMode && inputs.input3 !== ''"
              class="join join-horizontal border-2 border-solid"
            >
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues3[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input3, value.field_input)) }}
            </div>
          </td>
          <td>
            <div v-if="editMode && inputs.input4 !== ''">
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues4[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input4, value.field_input)) }}
            </div>
          </td>
          <td>
            <div v-if="editMode && inputs.input5 !== ''">
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues5[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input5, value.field_input)) }}
            </div>
          </td>
          <td>
            <div v-if="editMode && inputs.input6 !== ''">
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues6[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input6, value.field_input)) }}
            </div>
          </td>
        </tr>
      </tbody>
      <tr class="border-y-2 border-gray-300">
        <td>Section3</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tbody class="bg-white">
        <tr
          v-for="(value, key) in fields.section3
            .filter(
              (field) =>
                field[`bank_${bank}`] === 1 && field[`sp_type${sp_type}`] === 1
            )
            .sort((a, b) => {
              const orderA = a[`order_${bank}`] || Number.MAX_VALUE;
              const orderB = b[`order_${bank}`] || Number.MAX_VALUE;
              return orderA - orderB;
            })"
          :key="key"
        >
          <td>{{ value.name_th }}</td>
          <td>
            <div
              v-if="editMode && inputs.input1 !== ''"
              class="join join-horizontal border-2 border-solid"
            >
              <input
                class="input input-sm input-bordered join-item w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues1[value.field_input]"
              />
              <!-- <span class="join-item p-2">N</span> -->
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input1, value.field_input)) }}
            </div>
          </td>
          <td>
            <div
              v-if="editMode && inputs.input2 !== ''"
              class="join join-horizontal border-2 border-solid"
            >
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues2[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input2, value.field_input)) }}
            </div>
          </td>
          <td>
            <div
              v-if="editMode && inputs.input3 !== ''"
              class="join join-horizontal border-2 border-solid"
            >
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues3[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input3, value.field_input)) }}
            </div>
          </td>
          <td>
            <div v-if="editMode && inputs.input4 !== ''">
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues4[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input4, value.field_input)) }}
            </div>
          </td>
          <td>
            <div v-if="editMode && inputs.input5 !== ''">
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues5[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input5, value.field_input)) }}
            </div>
          </td>
          <td>
            <div v-if="editMode && inputs.input6 !== ''">
              <input
                class="input input-sm input-bordered w-full"
                type="text"
                placeholder="เพิ่มข้อมูล"
                v-model="inputValues.inputValues6[value.field_input]"
              />
            </div>
            <div v-else>
              {{ displayValue(getValue(inputs.input6, value.field_input)) }}
            </div>
          </td>
        </tr>
      </tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>

  <SelectModal
    ref="select_modal"
    :input="pickInputValues"
    :sp_type="sp_type"
    @save="setInput"
  />

  <!-- <div class="w-full bg-gray-50 border border-gray-300 rounded-lg">
    <p>bank: {{ bank }}</p>
    <p>sp_type: {{ sp_type }}</p>
    <p>input1: {{ inputs.input1 }}</p>
    <p>inputValues1: {{ inputValues.inputValues1?.filepath1 }}</p>
    <p>input2: {{ inputs.input2 }}</p>
    <p>inputValues2: {{ inputValues.inputValues2?.filepath1 }}</p>
    <p>input3: {{ inputs.input3 }}</p>
    <p>inputValues3: {{ inputValues.inputValues3?.filepath1 }}</p>
    <p>input4: {{ inputs.input4 }}</p>
    <p>inputValues4: {{ inputValues.inputValues4?.filepath1 }}</p>
    <p>input5: {{ inputs.input5 }}</p>
    <p>inputValues5: {{ inputValues.inputValues5?.filepath1 }}</p>
    <p>input6: {{ inputs.input6 }}</p>
    <p>inputValues6: {{ inputValues.inputValues6?.filepath1 }}</p>
    <p>editMode: {{ editMode }}</p>
  </div> -->
</template>

<script>
import apiClient from '../services/axios'; // Adjust the path as needed
import SelectModal from "./SelectModal.vue";
import ExcelJS from "exceljs";
import data from "../assets/csvjson.json";

export default {
  name: "Grid",
  components: {
    SelectModal,
  },
  props: {},
  data() {
    return {
      editMode: false,
      bank: "",
      sp_type: "",
      inputs: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
      },
      draggedInput: null,
      inputValues: {
        inputValues1: {},
        inputValues2: {},
        inputValues3: {},
        inputValues4: {},
        inputValues5: {},
        inputValues6: {},
      },

      fields: {
        section1: [
          {
            id: 1,
            name_en: "",
            name_th: "เนื้อที่ดิน ตารางวา",
            section: 1,
            export_part: 2,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "tw",
            order_ghb: 1,
            order_gsb: 1,
            order_kbank: 1,
            order_scb: 1,
          },
          {
            id: 4,
            name_en: "",
            name_th: "gis id",
            section: 1,
            export_part: 2,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "gis_id",
            order_ghb: 2,
            order_gsb: 2,
            order_kbank: 2,
            order_scb: 2,
          },
          {
            id: 7,
            name_en: "",
            name_th: "zone code",
            section: 1,
            export_part: 1,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "zone_code",
            order_ghb: 3,
            order_gsb: 3,
            order_kbank: 3,
            order_scb: 3,
          },
          {
            id: 13,
            name_en: "",
            name_th: "วันที่",
            section: 1,
            export_part: 2,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "data_date",
            order_ghb: 5,
            order_gsb: 5,
            order_kbank: 5,
            order_scb: 5,
          },
          {
            id: 19,
            name_en: "",
            name_th: "val div",
            section: 1,
            export_part: 1,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "val_div",
            order_ghb: 7,
            order_gsb: 7,
            order_kbank: 7,
            order_scb: 7,
          },
          {
            id: 22,
            name_en: "",
            name_th: "id code",
            section: 1,
            export_part: 1,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: 1,
            category: "",
            field_input: "id_code",
            order_ghb: 8,
            order_gsb: 8,
            order_kbank: 8,
            order_scb: 8,
          },
          {
            id: 10,
            name_en: "",
            name_th: "type code",
            section: 1,
            export_part: 1,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: 1,
            category: "",
            field_input: "type_code",
            order_ghb: 4,
            order_gsb: 4,
            order_kbank: 4,
            order_scb: 4,
          },
          {
            id: 25,
            name_en: "",
            name_th: "ความกว้างที่ดิน",
            section: 1,
            export_part: 3,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "field_width",
            order_ghb: 11,
            order_gsb: 11,
            order_kbank: 11,
            order_scb: 11,
          },
          {
            id: 26,
            name_en: "",
            name_th: "ตำบล",
            section: 1,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "tumbon",
            order_ghb: 12,
            order_gsb: 12,
            order_kbank: 12,
            order_scb: 12,
          },
          {
            id: 16,
            name_en: "",
            name_th: "d type",
            section: 1,
            export_part: 1,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "d_type",
            order_ghb: 6,
            order_gsb: 6,
            order_kbank: 6,
            order_scb: 6,
          },
          {
            id: 28,
            name_en: "",
            name_th: "เนื้อที่ดิน งาน",
            section: 1,
            export_part: 2,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "ngan",
            order_ghb: 14,
            order_gsb: 14,
            order_kbank: 14,
            order_scb: 14,
          },
          {
            id: 30,
            name_en: "",
            name_th: "เบอร์โทร",
            section: 1,
            export_part: 2,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "contact_tel",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 32,
            name_en: "",
            name_th: "เนื้อที่ใช้สอยอาคาร",
            section: 1,
            export_part: 2,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "b_area",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 33,
            name_en: "",
            name_th: "จำนวนห้องนอน",
            section: 1,
            export_part: 2,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: "",
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "bedroom_n",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 23,
            name_en: "",
            name_th: "เนื้อที่ดินไร่",
            section: 1,
            export_part: 2,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "rai",
            order_ghb: 9,
            order_gsb: 9,
            order_kbank: 9,
            order_scb: 9,
          },
          {
            id: 24,
            name_en: "",
            name_th: "r id",
            section: 1,
            export_part: 2,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "r_id",
            order_ghb: 10,
            order_gsb: 10,
            order_kbank: 10,
            order_scb: 10,
          },
          {
            id: 27,
            name_en: "",
            name_th: "เนื้อที่ดิน ตารางเมตร",
            section: 1,
            export_part: 2,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "field_area",
            order_ghb: 13,
            order_gsb: 13,
            order_kbank: 13,
            order_scb: 13,
          },
          {
            id: 29,
            name_en: "",
            name_th: "ชื่อผู้ติดต่อ",
            section: 1,
            export_part: 2,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "contact",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 31,
            name_en: "",
            name_th: "เบอร์โทร2",
            section: 1,
            export_part: 2,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "contact_tel2",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 34,
            name_en: "",
            name_th: "จำนวนห้องน้ำ",
            section: 1,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "toilet_n",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 35,
            name_en: "",
            name_th: "อายุอาคาร",
            section: 1,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "b_old",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 36,
            name_en: "",
            name_th: "ระดับถนน",
            section: 1,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "soil_lev",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 37,
            name_en: "",
            name_th: "ความกว้างถนน",
            section: 1,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "r_width",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 38,
            name_en: "",
            name_th: "ความกว้างไหล่ทาง",
            section: 1,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "r2_width",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 39,
            name_en: "",
            name_th: "ผิวจราจร (รหัส)",
            section: 1,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "road_type",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 40,
            name_en: "",
            name_th: "ผิวจราจร (ชื่อ)",
            section: 1,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "road_type_text",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
        ],
        section2: [
          {
            id: 5,
            name_en: "",
            name_th: "ประเภททรัพย์ (รหัส)",
            section: 2,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "value_type",
            order_ghb: 2,
            order_gsb: 2,
            order_kbank: 2,
            order_scb: 2,
          },
          {
            id: 8,
            name_en: "",
            name_th: "แบบบ้าน",
            section: 2,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "value_type_house",
            order_ghb: 3,
            order_gsb: 3,
            order_kbank: 3,
            order_scb: 3,
          },
          {
            id: 11,
            name_en: "",
            name_th: "อำเภอ",
            section: 2,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "ampur",
            order_ghb: 4,
            order_gsb: 4,
            order_kbank: 4,
            order_scb: 4,
          },
          {
            id: 14,
            name_en: "",
            name_th: "จังหวัด",
            section: 2,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "province",
            order_ghb: 5,
            order_gsb: 5,
            order_kbank: 5,
            order_scb: 5,
          },
          {
            id: 20,
            name_en: "",
            name_th: "จำนวนชั้น",
            section: 2,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "b_fl",
            order_ghb: 7,
            order_gsb: 7,
            order_kbank: 7,
            order_scb: 7,
          },
          {
            id: 2,
            name_en: "",
            name_th: "เลขที่บ้าน",
            section: 2,
            export_part: 3,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "nadd",
            order_ghb: 1,
            order_gsb: 1,
            order_kbank: 1,
            order_scb: 1,
          },
          {
            id: 17,
            name_en: "",
            name_th: "ประเภททรัพย์ (ชื่อ)",
            section: 2,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "value_type_txt",
            order_ghb: 6,
            order_gsb: 6,
            order_kbank: 6,
            order_scb: 6,
          },
          {
            id: 41,
            name_en: "",
            name_th: "มีไฟฟ้า",
            section: 2,
            export_part: 3,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "elect",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 46,
            name_en: "",
            name_th: "คำอธิบาย",
            section: 2,
            export_part: 3,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "describetion2",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 42,
            name_en: "",
            name_th: "มีเครื่องใช้ไฟฟ้า",
            section: 2,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "r_elect",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 43,
            name_en: "",
            name_th: "มีโทรศัพท์",
            section: 2,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "telephone",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 44,
            name_en: "",
            name_th: "มีระบบน้ำ",
            section: 2,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "water",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 45,
            name_en: "",
            name_th: "มีท่อประปา",
            section: 2,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "water_pipe",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
        ],
        section3: [
          {
            id: 3,
            name_en: "",
            name_th: "ชื่อถนน",
            section: 3,
            export_part: 1,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "road",
            order_ghb: 1,
            order_gsb: 1,
            order_kbank: 1,
            order_scb: 1,
          },
          {
            id: 12,
            name_en: "",
            name_th: "ซอยสาธารณะ",
            section: 3,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "soi",
            order_ghb: 4,
            order_gsb: 4,
            order_kbank: 4,
            order_scb: 4,
          },
          {
            id: 18,
            name_en: "",
            name_th: "ประเภทบุคคล (รหัส)",
            section: 3,
            export_part: 2,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "contact_type_txt",
            order_ghb: 6,
            order_gsb: 6,
            order_kbank: 6,
            order_scb: 6,
          },
          {
            id: 6,
            name_en: "",
            name_th: "ซอยโครงการ",
            section: 3,
            export_part: 3,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "pro_soi",
            order_ghb: 2,
            order_gsb: 2,
            order_kbank: 2,
            order_scb: 2,
          },
          {
            id: 9,
            name_en: "",
            name_th: "ทำเลที่ตั้งหลักประกัน / ที่ตั้งโครงการ",
            section: 3,
            export_part: 3,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "pro_name",
            order_ghb: 3,
            order_gsb: 3,
            order_kbank: 3,
            order_scb: 3,
          },
          {
            id: 15,
            name_en: "",
            name_th: "ประเภทบุคคล (ชื่อ)",
            section: 3,
            export_part: 2,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "contact_type",
            order_ghb: 5,
            order_gsb: 5,
            order_kbank: 5,
            order_scb: 5,
          },
          {
            id: 21,
            name_en: "",
            name_th: "ระยะห่างจากถนนสายหลัก",
            section: 3,
            export_part: 1,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "en_distrance",
            order_ghb: 7,
            order_gsb: 7,
            order_kbank: 7,
            order_scb: 7,
          },
          {
            id: 47,
            name_en: "",
            name_th: "ราคาเสนอ",
            section: 3,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "t_cost",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 48,
            name_en: "",
            name_th: "ราคาเสนอ สุดท้าย",
            section: 3,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "sale_cost",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 49,
            name_en: "",
            name_th: "ราคาต่อตารางวา",
            section: 3,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "tw_cost",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 50,
            name_en: "",
            name_th: "ราคาต่อตารางวา สุดท้าย",
            section: 3,
            export_part: 3,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "tw_cost1",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 51,
            name_en: "",
            name_th: "ราคาเช่า",
            section: 3,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "rent_cost",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 52,
            name_en: "",
            name_th: "ไฟล์แนบ",
            section: 3,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "filepath1",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 53,
            name_en: "",
            name_th: "ที่ดินกว้าง แปลงที่1",
            section: 3,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "sr_width",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 54,
            name_en: "",
            name_th: "ที่ดินกว้าง แปลงที่2",
            section: 3,
            export_part: 3,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "sr2_width",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 55,
            name_en: "",
            name_th: "recall data",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "recall_data",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 56,
            name_en: "",
            name_th: "recall date",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "recall_date",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 57,
            name_en: "",
            name_th: "recall total cost",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "recall_total_cost",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 58,
            name_en: "",
            name_th: "describetion",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "describetion",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 59,
            name_en: "",
            name_th: "filepath1 web",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "filepath1_web",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 60,
            name_en: "",
            name_th: "recorder",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "recorder",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 61,
            name_en: "",
            name_th: "recordtime",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "recordtime",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 62,
            name_en: "",
            name_th: "edit admin",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "edit_admin",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 63,
            name_en: "",
            name_th: "describetion admin",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: 1,
            category: "",
            field_input: "describetion_admin",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 64,
            name_en: "",
            name_th: "web data",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "web_data",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 65,
            name_en: "",
            name_th: "filepath doc",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "filepath_doc",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 66,
            name_en: "",
            name_th: "p building",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "p_building",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 67,
            name_en: "",
            name_th: "p unit",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "p_unit",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 68,
            name_en: "",
            name_th: "p unit area",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "p_unit_area",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 69,
            name_en: "",
            name_th: "p unuse",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "p_unuse",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 70,
            name_en: "",
            name_th: "p field area",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: 1,
            category: "",
            field_input: "p_field_area",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 71,
            name_en: "",
            name_th: "p furniture",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "p_furniture",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 72,
            name_en: "",
            name_th: "p aircondition",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "p_aircondition",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 73,
            name_en: "",
            name_th: "p rent cost1",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "p_rent_cost1",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 74,
            name_en: "",
            name_th: "p rent cost2",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "p_rent_cost2",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 75,
            name_en: "",
            name_th: "gis x",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: 1,
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "gis_x",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 76,
            name_en: "",
            name_th: "gis y",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "gis_y",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 77,
            name_en: "",
            name_th: "gis x utm",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "gis_x_utm",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 78,
            name_en: "",
            name_th: "gis y utm",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: 1,
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "gis_y_utm",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 79,
            name_en: "",
            name_th: "lastupdate",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "lastupdate",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 80,
            name_en: "",
            name_th: "salew cost",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "salew_cost",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 81,
            name_en: "",
            name_th: "property type",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "property_type",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 82,
            name_en: "",
            name_th: "depth land",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "depth_land",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 83,
            name_en: "",
            name_th: "h maintain",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "h_maintain",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 84,
            name_en: "",
            name_th: "h perfect",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "h_perfect",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 85,
            name_en: "",
            name_th: "l location",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "l_location",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 86,
            name_en: "",
            name_th: "environment",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "environment",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 87,
            name_en: "",
            name_th: "z color",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: 1,
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "z_color",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 88,
            name_en: "",
            name_th: "accommodate",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "accommodate",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 89,
            name_en: "",
            name_th: "other law",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "other_law",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 90,
            name_en: "",
            name_th: "csl p100",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "csl_p100",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 91,
            name_en: "",
            name_th: "csl p200",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "csl_p200",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 92,
            name_en: "",
            name_th: "csl p300",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "csl_p300",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 93,
            name_en: "",
            name_th: "promotion",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "promotion",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 94,
            name_en: "",
            name_th: "reference",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "reference",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 95,
            name_en: "",
            name_th: "filepath2",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "filepath2",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 96,
            name_en: "",
            name_th: "landmarks",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "landmarks",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 97,
            name_en: "",
            name_th: "gis x2",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "gis_x2",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 98,
            name_en: "",
            name_th: "gis y2",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "gis_y2",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 99,
            name_en: "",
            name_th: "email",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "email",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 100,
            name_en: "",
            name_th: "home tel",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "home_tel",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 101,
            name_en: "",
            name_th: "inf compare",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "inf_compare",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 102,
            name_en: "",
            name_th: "total amount",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "total_amount",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 103,
            name_en: "",
            name_th: "size unit",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "size_unit",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 104,
            name_en: "",
            name_th: "land unit",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "land_unit",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 105,
            name_en: "",
            name_th: "type amount",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "type_amount",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 106,
            name_en: "",
            name_th: "occupancy rate",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "occupancy_rate",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 107,
            name_en: "",
            name_th: "service rule",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "service_rule",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 108,
            name_en: "",
            name_th: "other service",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "other_service",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 109,
            name_en: "",
            name_th: "type asset",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "type_asset",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 110,
            name_en: "",
            name_th: "meal cost",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "meal_cost",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 111,
            name_en: "",
            name_th: "total bed",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "total_bed",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 112,
            name_en: "",
            name_th: "green fee",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "green_fee",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 113,
            name_en: "",
            name_th: "caddy fee",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: 1,
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "caddy_fee",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 114,
            name_en: "",
            name_th: "golfcart rent",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "golfcart_rent",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 115,
            name_en: "",
            name_th: "member class",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "member_class",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 116,
            name_en: "",
            name_th: "member cost",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "member_cost",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 117,
            name_en: "",
            name_th: "bedroom toilet",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: 1,
            sp_type3: 1,
            category: "",
            field_input: "bedroom_toilet",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 118,
            name_en: "",
            name_th: "date sell",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "date_sell",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 119,
            name_en: "",
            name_th: "per sell",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "per_sell",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 120,
            name_en: "",
            name_th: "pro dev",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "pro_dev",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 121,
            name_en: "",
            name_th: "cons ta",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "cons_ta",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 122,
            name_en: "",
            name_th: "type obj",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "type_obj",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 123,
            name_en: "",
            name_th: "bank",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "bank",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 124,
            name_en: "",
            name_th: "price unit",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "price_unit",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 125,
            name_en: "",
            name_th: "rent unit",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "rent_unit",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 126,
            name_en: "",
            name_th: "isweb",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: 1,
            category: "",
            field_input: "isweb",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 127,
            name_en: "",
            name_th: "date up manual",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "date_up_manual",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 128,
            name_en: "",
            name_th: "contact type bank",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "contact_type_bank",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 129,
            name_en: "",
            name_th: "contact type institution",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "contact_type_institution",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 130,
            name_en: "",
            name_th: "ref kind",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "ref_kind",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 131,
            name_en: "",
            name_th: "ref name",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "ref_name",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 132,
            name_en: "",
            name_th: "ref bookno",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "ref_bookno",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 133,
            name_en: "",
            name_th: "ref date",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "ref_date",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 134,
            name_en: "",
            name_th: "ref pageno",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: 1,
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "ref_pageno",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 135,
            name_en: "",
            name_th: "ref website name",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "ref_website_name",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 136,
            name_en: "",
            name_th: "ref website link",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "ref_website_link",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 137,
            name_en: "",
            name_th: "sale rent",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "sale_rent",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 138,
            name_en: "",
            name_th: "house name",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "house_name",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 139,
            name_en: "",
            name_th: "l condo",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "l_condo",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 140,
            name_en: "",
            name_th: "faci commun",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "faci_commun",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 141,
            name_en: "",
            name_th: "field cost",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: 1,
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "field_cost",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 142,
            name_en: "",
            name_th: "extention",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "extention",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 143,
            name_en: "",
            name_th: "sale condition",
            section: 3,
            export_part: 4,
            bank_ghb: 1,
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: "",
            sp_type3: 1,
            category: "",
            field_input: "sale_condition",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 144,
            name_en: "",
            name_th: "floor no",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: "",
            sp_type2: 1,
            sp_type3: "",
            category: "",
            field_input: "floor_no",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
          {
            id: 145,
            name_en: "",
            name_th: "comment txt",
            section: 3,
            export_part: 4,
            bank_ghb: "",
            bank_gsb: "",
            bank_kbank: "",
            bank_scb: "",
            bank_baac: "",
            sp_type1: 1,
            sp_type2: "",
            sp_type3: "",
            category: "",
            field_input: "comment_txt",
            order_ghb: "",
            order_gsb: "",
            order_kbank: "",
            order_scb: "",
          },
        ],
      },
      data,
      data2: [], // Initialize as empty array; will be populated via API
      pickInputValues: null,
      pickInputID: "",
      form: {
        name_en: '',
        name_th: '',
        // Add other fields as needed
      },
      currentItem: null, // Holds the item being edited
    };
  },
  methods: {
    async fetchGridData() {
      try {
        const response = await apiClient.get("/grid", {
          params: {
            id_code: this.id_code,
            bank_name: this.bank_name,
            sp_type: this.sp_type,
          },
        });
        this.data2 = response.data;

        // Transform sections into arrays
        for (let section in this.data2) {
          if (Array.isArray(this.data2[section])) {
            this.data2[section] = this.data2[section];
          } else if (typeof this.data2[section] === "object") {
            // Convert object to array of field objects
            this.data2[section] = Object.keys(
              this.data2[section]
            ).map((key) => ({
              field_input: key,
              value: this.data2[section][key],
              // Add any additional metadata if available
              name_th: key, // Placeholder: replace with actual name_th if available
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching grid data:", error);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์");
      }
    },
    async createData(newEntry) {
      try {
        const response = await apiClient.post('/grid', newEntry);
        this.data.push(response.data);
        alert("Data created successfully!");
      } catch (error) {
        console.error("Error creating data:", error);
        alert("Failed to create data.");
      }
    },
    async updateData(id, updatedEntry) {
      try {
        const response = await apiClient.put(`/grid/${id}`, updatedEntry);
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
          this.$set(this.data, index, response.data);
          alert("Data updated successfully!");
        }
      } catch (error) {
        console.error("Error updating data:", error);
        alert("Failed to update data.");
      }
    },
    async deleteData(id) {
      try {
        await apiClient.delete(`/grid/${id}`);
        this.data = this.data.filter(item => item.id !== id);
        alert("Data deleted successfully!");
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Failed to delete data.");
      }
    },
    onDragStart(key) {
      this.draggedInput = key;
    },
    onDrop(key) {
      if (this.draggedInput && this.draggedInput !== key) {
        // Swap values
        const temp = this.inputs[key];
        this.inputs[key] = this.inputs[this.draggedInput];
        this.inputs[this.draggedInput] = temp;
        this.draggedInput = null;
      }
    },
    changeEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        console.log("Edit Mode");
      } else {
        console.log("View Mode");
      }
    },
    getValue(inputId, fieldInput) {
      const index = this.data.findIndex((item) => item.id_code === inputId);
      if (index !== -1 && fieldInput) {
        return this.data[index][fieldInput];
      }
      return "";
    },
    displayValue(value) {
      if (value == undefined) {
        return "ไม่มีข้อมูล";
      }
      return value;
    },
    displayImage(value) {
      if (value == undefined || value == "") {
        return "/src/assets/image.png";
      }
      return "" + value;
    },
    setInput(input) {
      const id_code = input.input?.id_code || "";
      let existingKey = null;

      // Find if id_code already exists in inputs
      for (let key in this.inputs) {
        if (this.inputs[key] === id_code) {
          existingKey = key;
          break;
        }
      }

      // Remove existing id_code from inputs
      if (existingKey !== null) {
        console.log("remove");
        this.inputs[existingKey] = "";
      }

      // Swap if this.inputs[this.pickInputID] is not empty
      if (this.inputs[this.pickInputID] !== "") {
        console.log("swap");
        if (existingKey !== null) {
          this.inputs[existingKey] = this.inputs[this.pickInputID];
        } else {
          // Find an empty key to swap with
          let emptyKey = null;
          for (let key in this.inputs) {
            if (this.inputs[key] === "") {
              emptyKey = key;
              break;
            }
          }
          if (emptyKey !== null) {
            this.inputs[emptyKey] = this.inputs[this.pickInputID];
          }
        }
      }

      // Set the new id_code
      this.inputs[this.pickInputID] = id_code;
    },
    handlePickInput(inputID, inputValues) {
      this.pickInputID = inputID;
      if (inputValues != "") {
        this.pickInputValues = this.data.find(
          (item) => item.id_code === inputValues
        );
      } else {
        this.pickInputValues = null;
      }
      select_modal.showModal();
    },
    updateQueryParameter(key, value) {
      this.$router.push({ query: { ...this.$route.query, [key]: value } });
    },
    saveChange() {
      for (const newInput in this.inputValues) {
        if (
          this.data.findIndex(
            (item) => item.id_code === this.inputValues[newInput].id_code
          ) !== -1
        ) {
          console.log(this.inputValues[newInput]);
          console.log(
            this.data[
              this.data.findIndex(
                (item) => item.id_code === this.inputValues[newInput].id_code
              )
            ]
          );
          console.log(
            this.data.findIndex(
              (item) => item.id_code === this.inputValues[newInput].id_code
            )
          );

          this.data[
            this.data.findIndex(
              (item) => item.id_code === this.inputValues[newInput].id_code
            )
          ] = this.inputValues[newInput];
        }
      }

      this.changeEditMode();
    },
    isFieldRelevant(field) {
      const bankKey = `bank_${this.bank}`;
      const spTypeKey = `sp_type${this.sp_type}`;
      return field[bankKey] === 1 && field[spTypeKey] === 1;
    },

    exportToExcelAll() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("SelectedData");

      // Collect selected inputs
      const selectedInputs = Object.entries(this.inputs)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => ({
          key,
          id_code: value,
          data: this.inputValues[`inputValues${key.slice(-1)}`] || {},
        }));

      if (selectedInputs.length === 0) {
        alert("ไม่มีข้อมูลที่ถูกเลือกสำหรับการส่งออก");
        return;
      }

      // Gather all relevant fields across sections
      const allFields = [
        ...this.fields.section1,
        ...this.fields.section2,
        ...this.fields.section3,
      ]
        .filter((field) => this.isFieldRelevant(field))
        .sort((a, b) => {
          const orderA = a[`order_${this.bank}`] || Number.MAX_VALUE;
          const orderB = b[`order_${this.bank}`] || Number.MAX_VALUE;
          return orderA - orderB;
        });

      if (allFields.length === 0) {
        alert("ไม่มีฟิลด์ที่เกี่ยวข้องสำหรับการส่งออก");
        return;
      }

      // Prepare headers: "รายละเอียด" followed by field names
      const headers = ["รายละเอียด"].concat(
        allFields.map((field) => field.name_th)
      );

      // Add header row
      const headerRow = worksheet.addRow(headers);

      // Style header row
      headerRow.eachCell((cell, colNumber) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FEF2CB" }, 
        };
        cell.font = { bold: true };
      });

      // Iterate through each selected input and add its data as a row
      selectedInputs.forEach((input, index) => {
        const dataEntry = input.data;
        if (!dataEntry || Object.keys(dataEntry).length === 0) return;

        // Prepare row: first cell is "ข้อมูล X", followed by field values
        const rowValues = [`ข้อมูล ${input.key.slice(-1)}`];
        allFields.forEach((field) => {
          const value = dataEntry[field.field_input];
          rowValues.push(value !== undefined && value !== null ? value : "");
        });

        const row = worksheet.addRow(rowValues);

        // Style first cell of the row
        row.getCell(1).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FEF2CB" }, 
        };
        row.getCell(1).font = { bold: true };
      });

      // Adjust column widths
      headers.forEach((header, index) => {
        worksheet.getColumn(index + 1).width = 20;
      });

      // Write to buffer and trigger download
      workbook.xlsx
        .writeBuffer()
        .then((buffer) => {
          const blob = new Blob([buffer], { type: "application/octet-stream" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "SelectedDataExport.xlsx";
          a.click();
          window.URL.revokeObjectURL(url);
          alert("ข้อมูลที่เลือกถูกส่งออกเรียบร้อยแล้ว!");
        })
        .catch((error) => {
          console.error("Error exporting Excel file:", error);
          alert("เกิดข้อผิดพลาดในการส่งออกไฟล์ Excel กรุณาลองใหม่อีกครั้ง");
        });
    },

    exportPart(exportPartNumber, filename) {
      try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`Part${exportPartNumber}`);

        // Collect selected inputs
        const selectedInputs = Object.entries(this.inputs)
          .filter(([key, value]) => value !== "")
          .map(([key, value]) => ({
            key,
            id_code: value,
            data: this.inputValues[`inputValues${key.slice(-1)}`] || {},
          }));

        if (selectedInputs.length === 0) {
          alert(`ไม่มีข้อมูลที่ถูกเลือกสำหรับ Part ${exportPartNumber}`);
          return;
        }

        // Gather all relevant fields across sections for the specific part
        const allFields = [
          ...this.fields.section1,
          ...this.fields.section2,
          ...this.fields.section3,
        ]
          .filter((field) => field.export_part === exportPartNumber)
          .filter((field) => this.isFieldRelevant(field))
          .sort((a, b) => {
            const orderA = a[`order_${this.bank}`] || Number.MAX_VALUE;
            const orderB = b[`order_${this.bank}`] || Number.MAX_VALUE;
            return orderA - orderB;
          });

        if (allFields.length === 0) {
          alert(`ไม่มีฟิลด์ที่เกี่ยวข้องสำหรับ Part ${exportPartNumber}`);
          return;
        }

        // Prepare headers: "รายละเอียด" followed by field names
        const headers = ["รายละเอียด"].concat(
          allFields.map((field) => field.name_th)
        );

        // Add header row with styling
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell((cell, colNumber) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FEF2CB" }, 
          };
          cell.font = { bold: true };
        });

        // Iterate through each selected input and add its data as a row
        selectedInputs.forEach((input, index) => {
          const dataEntry = input.data;
          if (!dataEntry || Object.keys(dataEntry).length === 0) return;

          // Prepare row: first cell is "ข้อมูล X", followed by field values
          const rowValues = [`ข้อมูล ${input.key.slice(-1)}`];
          allFields.forEach((field) => {
            const value = dataEntry[field.field_input];
            rowValues.push(value !== undefined && value !== null ? value : "");
          });

          const row = worksheet.addRow(rowValues);

          // Style the first cell of the row
          const firstCell = row.getCell(1);
          firstCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FEF2CB" }, 
          };
          firstCell.font = { bold: true };
        });

        // Adjust column widths
        headers.forEach((header, index) => {
          worksheet.getColumn(index + 1).width = 20;
        });

        // Write to buffer and trigger download
        workbook.xlsx
          .writeBuffer()
          .then((buffer) => {
            const blob = new Blob([buffer], {
              type: "application/octet-stream",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            alert(`Part ${exportPartNumber} exported successfully!`);
          })
          .catch((error) => {
            console.error(`Error exporting Part ${exportPartNumber}:`, error);
            alert(
              `Failed to export Part ${exportPartNumber}. Please try again.`
            );
          });
      } catch (error) {
        console.error(`Error exporting Part ${exportPartNumber}:`, error);
        alert(`Failed to export Part ${exportPartNumber}. Please try again.`);
      }
    },

    // Methods to export specific parts
    exportToExcelPart1() {
      this.exportPart(1, "Part1DataExport.xlsx");
    },

    exportToExcelPart2() {
      this.exportPart(2, "Part2DataExport.xlsx");
    },

    exportToExcelPart3() {
      this.exportPart(3, "Part3DataExport.xlsx");
    },

    exportToExcelPart4() {
      this.exportPart(4, "Part4DataExport.xlsx");
    },

    // Generic method to export a specific section

    getDataWithContent(sectionFields) {
      // Prepare an array to hold the exported data
      const exportedData = [];

      // Iterate through each data entry
      this.data.forEach((dataEntry) => {
        // Create a row object for the current data entry
        const row = {};

        // Iterate through each field in the section
        sectionFields.forEach((field) => {
          const fieldName = field.name_th;
          const fieldKey = field.field_input;
          const value = dataEntry[fieldKey];

          // Only include the field if it contains data
          if (value !== undefined && value !== null && value !== "") {
            row[fieldName] = value;
          }
        });

        // If the row has at least one field with data, add it to exportedData
        if (Object.keys(row).length > 0) {
          exportedData.push(row);
        }
      });

      return exportedData;
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (!this.editMode) {
        this.cancelEdit();
      }
    },

    editItem(item) {
      this.currentItem = { ...item };
      this.form = { ...item };
      this.editMode = true;
    },

    cancelEdit() {
      this.currentItem = null;
      this.form = {
        name_en: '',
        name_th: '',
        // Reset other fields as needed
      };
    },

    async createEntry() {
      await this.createData(this.form);
      this.cancelEdit();
    },

    async updateEntry() {
      await this.updateData(this.currentItem.id, this.form);
      this.cancelEdit();
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.bank = to.query.bank || "";
        this.sp_type = to.query.sp_type || "";
        this.inputs.input1 = to.query.input1 || "";
        this.inputs.input2 = to.query.input2 || "";
        this.inputs.input3 = to.query.input3 || "";
        this.inputs.input4 = to.query.input4 || "";
        this.inputs.input5 = to.query.input5 || "";
        this.inputs.input6 = to.query.input6 || "";
      },
    },
    "inputs.input1": function (newVal) {
      this.inputValues.inputValues1 =
        this.data.find((item) => item.id_code === newVal) || {};
    },
    "inputs.input2": function (newVal) {
      this.inputValues.inputValues2 =
        this.data.find((item) => item.id_code === newVal) || {};
    },
    "inputs.input3": function (newVal) {
      this.inputValues.inputValues3 =
        this.data.find((item) => item.id_code === newVal) || {};
    },
    "inputs.input4": function (newVal) {
      this.inputValues.inputValues4 =
        this.data.find((item) => item.id_code === newVal) || {};
    },
    "inputs.input5": function (newVal) {
      this.inputValues.inputValues5 =
        this.data.find((item) => item.id_code === newVal) || {};
    },
    "inputs.input6": function (newVal) {
      this.inputValues.inputValues6 =
        this.data.find((item) => item.id_code === newVal) || {};
    },
  },
};
</script>
