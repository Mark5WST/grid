<template>
  <dialog id="select_modal" class="modal">
    <div class="modal-box w-11/12 max-w-4xl max-h-[690px]">
      <div>
        <h3 class="font-medium text-xl">เลือกสินทรัพย์</h3>
        <p class="py-3 font-normal text-base text-gray-500">
          การเลือกสินทรัพย์เพื่อเปรียบเทียบข้อมูลจำเป็นต้องเป็นสินทรัพย์ในหมวดหมู่เดียวกัน
        </p>
      </div>
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 md:col-span-1">
          <div class="flex-row text-sm mb-1">
            <span>หมวดหมู่: </span>
            <span v-if="sp_type == '1'">ที่ดินเปล่า</span>
            <span v-if="sp_type == '2'">สินทรัพย์พร้อมที่ดิน</span>
            <span v-if="sp_type == '3'">อาคารและคอนโด</span>
          </div>
          <v-text-field
            clearable
            label="ค้นหาสินทรัพย์"
            variant="outlined"
            rounded="lg"
            density="compact"
            v-model="search"
          ></v-text-field>
          <v-list class="overflow-y-scroll max-h-96">
            <v-list-item
              v-for="item in filteredItems"
              :key="item"
              @click="selectItem(item)"
            >
              {{ item.id_code }}
              <v-icon v-if="item == selectedItem" icon="mdi-check" end></v-icon>
            </v-list-item>
          </v-list>
        </div>
        <div class="col-span-3 md:col-span-2 text-sm font-medium">
          <div class="flex-row mb-1">
            <span>ตัวอย่างข้อมูลสินทรัพย์</span>
          </div>
          <div
            v-if="selectedItem == null"
            class="bg-gray-100 border-gray-200 h-96 flex flex-col items-center justify-center text-center"
          >
            <v-icon>mdi-magnify</v-icon>
            <p class="text-sm">สินทรัพย์ยังไม่ถูกเลือก</p>
            <p class="text-gray-500 text-xs">
              ตัวอย่างข้อมูลสินทรัพย์จะแสดงในส่วนนี้เมื่อสินทรัพย์ถูกเลือก
            </p>
            <p>{{ selectedItem?.id_code }}</p>
          </div>
          <div
            v-else
            class="border-gray-200 w-full max-96 flex-col border-2 join join-vertical"
          >
            <img
              class="h-72 join-item"
              :src="displayImage(selectedItem?.filepath1)"
              alt="selected image"
            />
            <div class="join-item p-4">
              <div>
                <div class="divider divider-start">ตำแหน่งที่ตั้ง</div>
                <div class="grid grid-cols-4">
                  <div>
                    <p class="text-gray-400">ถนน</p>
                    <p
                      class="text-base"
                      v-if="
                        selectedItem?.transports &&
                        selectedItem.transports.length > 0
                      "
                    >
                      {{ selectedItem.transports }}
                    </p>
                    <p class="text-base text-gray-400" v-else>ไม่มีข้อมูล</p>
                  </div>
                  <div>
                    <p class="text-gray-400">ซอย</p>
                    <p
                      class="text-base"
                      v-if="selectedItem?.soi && selectedItem.soi.length > 0"
                    >
                      {{ selectedItem?.soi }}
                    </p>
                    <p class="text-base text-gray-400" v-else>ไม่มีข้อมูล</p>
                  </div>
                  <div v-if="sp_type == 1">
                    <p class="text-gray-400">เนื้อที่ดิน</p>
                    <p
                      class="text-base"
                      v-if="
                        selectedItem?.area_wa && selectedItem.area_wa.length > 0
                      "
                    >
                      {{ selectedItem?.area_wa }}
                    </p>
                    <p class="text-base text-gray-400" v-else>ไม่มีข้อมูล</p>
                  </div>
                  <div v-else>
                    <p class="text-gray-400">บ้านเลขที่</p>
                    <p
                      class="text-base"
                      v-if="
                        selectedItem?.location &&
                        selectedItem.location.length > 0
                      "
                    >
                      {{ selectedItem?.location }}
                    </p>
                    <p class="text-base text-gray-400" v-else>ไม่มีข้อมูล</p>
                  </div>
                  <div>
                    <p class="text-gray-400">ระยะห่าง SP</p>
                    <p
                      class="text-base"
                      v-if="
                        selectedItem?.nearest_trans &&
                        selectedItem.nearest_trans.length > 0
                      "
                    >
                      {{ selectedItem?.nearest_trans }}
                    </p>
                    <p class="text-base text-gray-400" v-else>ไม่มีข้อมูล</p>
                  </div>
                </div>
              </div>
              <div v-if="sp_type != 1">
                <div class="divider divider-start">เนื้อที่และอาคาร</div>
                <div class="grid grid-cols-4">
                  <div v-if="sp_type == 1">
                    <p class="text-gray-400">เนื้อที่ดิน</p>
                    <p
                      class="text-base"
                      v-if="
                        selectedItem?.area_wa && selectedItem.area_wa.length > 0
                      "
                    >
                      {{ selectedItem?.area_wa }}
                    </p>
                    <p class="text-base text-gray-400" v-else>ไม่มีข้อมูล</p>
                  </div>
                  <div>
                    <p class="text-gray-400">เนื้อที่ใช้สอย</p>
                    <p
                      class="text-base"
                      v-if="
                        selectedItem?.bldg_area &&
                        selectedItem.bldg_area.length > 0
                      "
                    >
                      {{ selectedItem?.bldg_area }}
                    </p>
                    <p class="text-base text-gray-400" v-else>ไม่มีข้อมูล</p>
                  </div>
                  <div>
                    <p class="text-gray-400">อายุอาคาร</p>
                    <p
                      class="text-base"
                      v-if="
                        selectedItem?.bldg_age &&
                        selectedItem.bldg_age.length > 0
                      "
                    >
                      {{ selectedItem?.bldg_age }}
                    </p>
                    <p class="text-base text-gray-400" v-else>ไม่มีข้อมูล</p>
                  </div>
                </div>
              </div>
              <div>
                <div class="divider divider-start">ราคา</div>
                <div>
                  <p class="text-gray-400">ราคาเสนอ</p>
                  <p
                    class="text-base"
                    v-if="selectedItem?.price && selectedItem.price.length > 0"
                  >
                    {{ selectedItem?.price }}
                  </p>
                  <p class="text-base text-gray-400" v-else>ไม่มีข้อมูล</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog" class="space-x-2">
          <!-- if there is a button in form, it will close the modal -->
          <button @click="close" class="btn">ยกเลิก</button>
          <button @click="confirm" class="btn btn-neutral">ยืนยัน</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script>
import data from "../assets/csvjson.json";

export default {
  name: "Select",
  props: {
    input: {
      default: null,
    },
    sp_type: {
      type: String,
      default: "1",
    },
  },
  data() {
    return {
      search: "",
      data,
      selectedItem: this.input,
    };
  },
  computed: {
    filteredItems() {
      return this.data.filter((item) => item.id_code.includes(this.search));
    },
  },
  methods: {
    displayImage(value) {
      if (value == undefined || value == null || value == "") {
        return "../assets/image.png";
      }
      return "" + value;
    },
    selectItem(item) {
      if (item != this.selectedItem) {
        this.selectedItem = item;
      } else {
        this.selectedItem = null;
      }
    },
    close() {
      this.search = "";
      // this.selectedItem = null;
    },
    confirm() {
      this.$emit("save", {
        input: this.selectedItem || null,
      });
      this.close();
    },
  },
  watch: {
    input(newVal) {
      this.selectedItem = newVal;
    },
  },
};
</script>
